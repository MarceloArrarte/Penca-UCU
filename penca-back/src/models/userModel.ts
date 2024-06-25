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
    db.query('SELECT documento, nombre, documento_usuario, id_campeon, id_subcampeon FROM alumno a INNER JOIN usuario u WHERE u.documento = a.documento_usuario;', (err, results) => {
      if (err) { return reject(err); }

      const users = results as RowDataPacket[];

      const usersScores: UserScore[] = users.map(row => ({
        userDocument: row.documento,
        name: row.nombre,
        score: 0,
      }));

      const userScoresPromises = users.map(user => {
        return new Promise<void>((resolve, reject) => {
          const userScore = usersScores.find(userScore => userScore.userDocument === user.documento_usuario);

          db.query(
            `SELECT p.id AS id_partido, e.id AS id_equipo, pr.goles AS prediccion_goles, j.goles
            FROM partido p
            INNER JOIN juega j ON j.id_partido = p.id
            INNER JOIN equipo e ON e.id = j.id_equipo
            LEFT JOIN predice pr ON pr.id_equipo = j.id_equipo AND pr.id_partido = j.id_partido
            WHERE j.goles IS NOT NULL AND pr.goles IS NOT NULL AND pr.documento_alumno = ?
            ORDER BY p.id;`, [user.documento_usuario], (err, results) => {
              if (err) { return reject(err);}

              const rows = results as RowDataPacket[];

              const predictionsMap: { [key: number]: Prediction[] } = {};

              rows.forEach(row => {
                const prediction: Prediction = {
                  matchId: row.id_partido,
                  teamId: row.id_equipo,
                  goalsPrediction: row.prediccion_goles,
                  goals: row.goles,
                };

                if (!predictionsMap[prediction.matchId]) {
                  predictionsMap[prediction.matchId] = [];
                }

                predictionsMap[prediction.matchId].push(prediction);
              });

              for (const matchId in predictionsMap) {
                const matchPredictions = predictionsMap[matchId];

                if (matchPredictions.length === 2 && userScore) {
                  const team1 = matchPredictions[0];
                  const team2 = matchPredictions[1];

                  if (team1 && team2) {
                    const actualResult = team1.goals - team2.goals;
                    const predictedResult = team1.goalsPrediction - team2.goalsPrediction;

                    if (team1.goals === team1.goalsPrediction && team2.goals === team2.goalsPrediction) {
                      userScore.score += 4;
                    } else if (
                      (actualResult > 0 && predictedResult > 0) ||
                      (actualResult < 0 && predictedResult < 0) ||
                      (actualResult === 0 && predictedResult === 0)
                    ) {
                      userScore.score += 2;
                    }
                  }
                }
              }

              db.query(`SELECT j.id_equipo, j.goles FROM partido p INNER JOIN juega j ON j.id_partido = p.id 
                WHERE p.nombre_fase = "Final" AND j.goles IS NOT NULL;`, (err, results) => {
                  if (err) { return reject(err); }

                  const finalMatchResults = results as RowDataPacket[];

                  if (finalMatchResults.length !== 2) { return resolve(); }

                  let championId: number;
                  let runnerUpId: number;

                  if (finalMatchResults[0].goles > finalMatchResults[1].goles) {
                    championId = finalMatchResults[0].id_equipo;
                    runnerUpId = finalMatchResults[1].id_equipo;
                  } else if (finalMatchResults[0].goles < finalMatchResults[1].goles) {
                    championId = finalMatchResults[1].id_equipo;
                    runnerUpId = finalMatchResults[0].id_equipo;
                  } else {
                    championId = 0;
                    runnerUpId = 0;
                  }

                  if (championId === user.id_campeon && userScore) {
                    userScore.score += 10;
                  }

                  if (runnerUpId === user.id_subcampeon && userScore) {
                    userScore.score += 5;
                  }

                  resolve();
                }
              );
            }
          );
        });
      });

      Promise.all(userScoresPromises).then(() => {
        usersScores.sort((a, b) => b.score - a.score);

        resolve(usersScores);
      })
      .catch(err => {
        reject('Error');
      });
    });
  });
}

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
