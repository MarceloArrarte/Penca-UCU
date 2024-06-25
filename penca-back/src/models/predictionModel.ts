import db from '../config/database';
import { RowDataPacket } from 'mysql2';

interface Prediction {
  teamId: number,
  goalsPredict: number
}

interface MatchPrediction {
  userDocument: number,
  matchId: number,
  predictions: Prediction[]
}

const predictTeamsGoalsForMatch = (userDocument: number, matchId: number, predictions: Prediction[]): Promise<MatchPrediction> => {
  return new Promise((resolve, reject) => {
    db.beginTransaction(async err => {
      if (err) { return reject(err); }

      await new Promise<void>((resolve, reject) => {
        db.query(`SELECT fecha_hora FROM partido where id = ?`, [matchId], (err, results) => {
          if (err) { return db.rollback(() => { reject(err); }); }
  
          const match = results as RowDataPacket[];
  
          if (!match[0]) {
            db.rollback(() => {
              reject('Match does not exists')
            });
          }
  
          const matchDate = new Date(match[0].fecha_hora);
          const currentDateUTC = new Date();
          const currentDate = new Date(currentDateUTC.getTime() - (3 * 60 * 60 * 1000));
  
          if (matchDate <= currentDate) {
            return db.rollback(() => {
              reject('Cannot predict a match that has already started');
            });
          }
          else {
            resolve();
          }
        });
      }).catch(reject);

      const matchPrediction : MatchPrediction = {
        userDocument: userDocument,
        matchId: matchId,
        predictions: []
      }

      const predictionPromises = predictions.map(prediction => {
        return new Promise<void>((resolve, reject) => {
          db.query('SELECT * FROM equipo where id = ?', [prediction.teamId], (err, results) => {
            if (err) { return db.rollback(() => { reject(err); }); }

            const team = results as RowDataPacket[];

            if (!team[0]) {
              db.rollback(() => {
                reject(`Team(${prediction.teamId}) does not exists`)
              });
            }
          });

          db.query(`
            INSERT INTO predice (id_equipo, id_partido, documento_alumno, goles)
            VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE goles = VALUES(goles)
          `, [prediction.teamId, matchId, userDocument, prediction.goalsPredict], (err, _results) => {
            if (err) { return db.rollback(() => { reject(err); }); }

            matchPrediction.predictions.push(
              {
                teamId: prediction.teamId,
                goalsPredict: prediction.goalsPredict
              }
            );

            resolve();
          });
        });
      });

      Promise.all(predictionPromises).then(() => {
        db.commit(err => {
          if (err) { return db.rollback(() => { reject(err); }); }

          resolve(matchPrediction);
        });
      }).catch(err => {
        db.rollback(() => { reject(err); });
      });
    })
  })
}

export type MissingPredictionNotificationData = {
  documento: string,
  nombre: string,
  id_partido: number,
  fecha_hora: Date,
  fase: string,
  equipos: string
}

const getUsersMissingPredictions = (): Promise<MissingPredictionNotificationData[]> => {
  return new Promise(async (resolve, reject) => {
    db.query(
     `SELECT u.documento, u.nombre, t1.*
      FROM usuario u
      INNER JOIN alumno a ON a.documento_usuario = u.documento
      CROSS JOIN (
        SELECT p.id AS id_partido, p.fecha_hora, p.nombre_fase AS fase, t2.equipos
        FROM partido p
        INNER JOIN (
          SELECT p.id, GROUP_CONCAT(e.pais SEPARATOR ' - ') AS equipos
          FROM partido p
          INNER JOIN juega j ON j.id_partido = p.id
          INNER JOIN equipo e ON e.id = j.id_equipo
          WHERE p.fecha_hora > DATE_ADD(NOW(), INTERVAL 1 HOUR)
          AND p.fecha_hora < DATE_ADD(NOW(), INTERVAL 1 DAY)
          GROUP BY p.id
        ) t2 ON t2.id = p.id
      ) t1
      LEFT JOIN predice p2 ON (
        p2.id_partido = t1.id_partido
        AND p2.documento_alumno = a.documento_usuario
      )
      WHERE p2.documento_alumno IS NULL;`,
      (err, result) => {
        if (err) { return reject(err); }

        resolve(result as MissingPredictionNotificationData[]);
      }
    )
  });
}

export { predictTeamsGoalsForMatch , getUsersMissingPredictions }
