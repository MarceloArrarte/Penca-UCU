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

    db.beginTransaction(err => {
      if (err) { return reject(err); }

      const matchPrediction : MatchPrediction = {
        userDocument: userDocument,
        matchId: matchId,
        predictions: []
      }

      const predictionPromises = predictions.map(prediction => {
        return new Promise<void>((resolve, reject) => {
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

export { predictTeamsGoalsForMatch }
