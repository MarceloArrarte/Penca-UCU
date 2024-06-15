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

      predictions.forEach(prediction => { 
        db.query('INSERT INTO predice (id_equipo, id_partido, documento_alumno, goles) values (?, ?, ?, ?)',
        [prediction.teamId, matchId, userDocument, prediction.goalsPredict], (err, results) => {
          console.log(err)
          if (err) { return db.rollback(() => { return reject(err); }); }

          matchPrediction.predictions.push(
            {
              teamId: prediction.teamId,
              goalsPredict: prediction.goalsPredict
            }
          );
        })
      })

      db.commit(err => {
        if (err) { return db.rollback(() => { reject(err); }); }

        resolve(matchPrediction);
      });
    })

    // db.query('SELECT * FROM predice where documento_alumno = ? AND id_partido = ?',
    // [userDocument, matchId], (err, results) => {
    //   if (err) { return reject(err); }

    //   const rows = results as RowDataPacket[];

    //   const matchPredictionMap: { [key: number]: MatchPrediction } = {};
  
  })
}

export { predictTeamsGoalsForMatch }
