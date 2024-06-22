import db from '../config/database';
import { RowDataPacket } from 'mysql2';

interface User {
  document: string;
  name: string;
  email: string;
  password: string;
  role: UserRole
}

type UserRole = 'admin' | 'alumno';

interface Prediction {
  matchId: number;
  teamId: number;
  goalsPrediction: number;
  goals: number;
}

interface UserScore {
  userDocument: String;
  name: String;
  score: number;
}

const getAllUserScores = (): Promise<UserScore[]> => {
  return new Promise((resolve, reject) => { 
    db.query('SELECT documento, nombre FROM alumno a INNER JOIN usuario u WHERE u.documento = a.documento_usuario;', (err, results) => {
      if (err) { return reject(err); }

      const users = results as RowDataPacket[];
      
      console.log(users);

      const usersRanking: UserScore[] = users.map(row => {  
        return {
          userDocument: row.documento,
          name: row.nombre,
          score: 0
        };
      });
    
      const userScoresPromises = usersRanking.map(userScore => {
        return new Promise<void>((resolve, reject) => {
          db.query(`SELECT p.id AS id_partido, e.id AS id_equipo, pr.goles AS prediccion_goles, j.goles
            FROM partido p
            INNER JOIN juega j on j.  id_partido = p.id
            INNER JOIN equipo e on e.id = j.id_equipo
            LEFT JOIN  predice pr ON pr.id_equipo = j.id_equipo AND pr.id_partido = j.id_partido
            WHERE j.goles IS NOT NULL AND pr.goles IS NOT NULL AND pr.documento_alumno = ?
            ORDER BY p.id;`, [userScore.userDocument],(err, results) => {
              if (err) { return reject(err); }

              const rows = results as RowDataPacket[];

              const predictionsMap: { [key: number]: Prediction[] } = {};

              rows.forEach(row => {
                const prediction: Prediction = {
                  matchId: row.id_partido,
                  teamId: row.id_equipo,
                  goalsPrediction: row.prediccion_goles,
                  goals: row.goles
                };
    
                if (!predictionsMap[prediction.matchId]) {
                  predictionsMap[prediction.matchId] = [];
                }
    
                predictionsMap[prediction.matchId].push(prediction);
              });

              for (const matchId in predictionsMap) {
                const matchPredictions = predictionsMap[matchId];
    
                if (matchPredictions.length === 2) {
                  const team1 = matchPredictions[0];
                  const team2 = matchPredictions[1];
    
                  if (team1 && team2) {
                    const actualResult = team1.goals - team2.goals;
                    const predictedResult = team1.goalsPrediction - team2.goalsPrediction;

                    if (team1.goals == team1.goalsPrediction && team2.goals == team2.goalsPrediction) {
                      userScore.score += 4;
                    } else if (
                      (actualResult > 0 && predictedResult > 0) || 
                      (actualResult < 0 && predictedResult < 0) || 
                      (actualResult === 0 && predictedResult === 0) ) {
                        userScore.score += 2;
                    }
                  }
                }
              }

              resolve()
          });
        });
      });

      Promise.all(userScoresPromises)
      .then(() => {
        usersRanking.sort((a, b) => b.score - a.score);

        resolve(usersRanking);
      })
      .catch(err => {
        reject('Error');
      });
    });
  });
};

const getUserByEmail = (email: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT
        u.documento AS document,
        u.nombre,
        u.email,
        u.contraseña AS password,
        CASE
          WHEN a.documento_usuario IS NOT NULL THEN 'admin'
          WHEN a2.documento_usuario IS NOT NULL THEN 'alumno'
        END AS role
      FROM usuario u
      LEFT JOIN admin a ON a.documento_usuario = u.documento
      LEFT JOIN alumno a2 ON a2.documento_usuario = u.documento
      WHERE email = ?`, [email], (err, results) => {
      if (err) { return reject(err); }

      const users = results as RowDataPacket[];

      resolve(users[0] as User);
    });
  });
};

const getUserByEmailOrDocument = (email: string, document: number): Promise<User> => {
  return new Promise((resolve, reject) => {
    db.query('SELECT documento, nombre, email, contraseña AS password FROM usuario WHERE email = ? OR documento = ?', [email, document], (err, results) => {
      if (err) { return reject(err); }

      const users = results as RowDataPacket[];

      resolve(users[0] as User);
    });
  });
};

const createUser = (document: string, name: string, email: string, hashedPassword: string,
                    championId: number, runnerUpId: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.beginTransaction(err => {
      if (err) { return reject(err); }

      db.query('INSERT INTO usuario (documento, nombre, email, contraseña) values (?, ?, ?, ?)',
      [document, name, email, hashedPassword],
      (err, result) => {
        if (err) { return reject(err); }

        db.query('INSERT INTO alumno (documento_usuario, id_campeon, id_subcampeon) values (?, ?, ?)',
        [document, championId, runnerUpId],
        (err, _result) => {
          if (err) { return db.rollback(() => { return reject(err); }); }

          resolve()
        });

        db.commit(err => {
          if (err) { return db.rollback(() => { reject(err); }); }

          resolve();
        });
      });
    });
  });
};

export { getAllUserScores, getUserByEmail, createUser, getUserByEmailOrDocument, User };
