import db from '../config/database';
import { RowDataPacket } from 'mysql2';

interface Teams {
  idTeam: number,
  country: string;
  goalsPredict: number | null;
  goals: number | null
}

interface Match {
  id: number;
  date: string;
  phase: string;
  teams: Teams[]
}

interface TeamResult {
  idTeam: number | null,
  country: string | null;
  goals: number | null; 
}

interface MatchAndResult {
  id: number;
  date: string;
  phase: string;
  teams: TeamResult[];
}

interface MatchTeams {
  matchId: number;
  teamIds: number[];
} 

const getAllMatches = (): Promise<MatchAndResult[]> => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT p.id, p.fecha_hora, p.nombre_fase, e.id AS id_equipo, e.pais, j.goles FROM partido p
      INNER JOIN juega j on j.id_partido = p.id
      INNER JOIN equipo e on e.id = j.id_equipo
      ORDER BY p.fecha_hora ASC;`, (err, results) => {
      if (err) { return reject(err); }

      const rows = results as RowDataPacket[];
      const matchesMap: { [key: number]: MatchAndResult } = {};
      
      rows.forEach(row => {
        const matchId = row.id;

        if (!matchesMap[matchId]) {
          matchesMap[matchId] = {
            id: matchId,
            date: row.fecha_hora,
            phase: row.nombre_fase,
            teams: []
          };
        }

        matchesMap[matchId].teams.push(
          {
            idTeam: row.id_partido,
            country: row.pais,
            goals: row.goles
          } 
        )
      })

      const matches: MatchAndResult[] = Object.values(matchesMap);

      resolve(matches as MatchAndResult[]);
    });
  });
}

const getMatchesAndPredictions = (userDocument: number, played: string): Promise<Match[]> => {
  return new Promise((resolve, reject) => {
    let playedFilter = ''

    if (played == 'true') {
      playedFilter = `where pr.goles IS NOT NULL`;
    } else if (played == 'false') {
      playedFilter = `where pr.goles IS NULL`;
    }

    db.query(`
      SELECT p.id, p.fecha_hora, p.nombre_fase, e.id AS id_equipo, e.pais, pr.goles AS prediccion_goles, j.goles FROM partido p
      INNER JOIN juega j on j.id_partido = p.id
      INNER JOIN equipo e on e.id = j.id_equipo
      LEFT JOIN  predice pr ON pr.id_equipo = j.id_equipo AND
      pr.id_partido = j.id_partido AND pr.documento_alumno = ?
      ${playedFilter}
      ORDER BY p.id;`,
    [userDocument], (err, results) => {
      if (err) { return reject(err); }

      const rows = results as RowDataPacket[];
      const matchesMap: { [key: number]: Match } = {};
      
      rows.forEach(row => {
        const matchId = row.id;

        if (!matchesMap[matchId]) {
          matchesMap[matchId] = {
            id: matchId,
            date: row.fecha_hora,
            phase: row.nombre_fase,
            teams: []
          };
        }

        matchesMap[matchId].teams.push(
          {
            idTeam: row.id_partido,
            country: row.pais,
            goalsPredict: row.prediccion_goles,
            goals: row.goles
          } 
        )
      })

      const matches: Match[] = Object.values(matchesMap);

      resolve(matches);
    });
  });
};

const updateMatchTeams = (matchId: number, teamIds: number[]): Promise<MatchTeams> => {
  return new Promise((resolve, reject) => {
    db.beginTransaction(err => {
      if (err) { return reject(err); }
      
      const matchTeams : MatchTeams = {
        matchId: matchId,
        teamIds: []
      }

      db.query('SELECT * FROM partido WHERE id = ?', [matchId], (err, results) => {
        if (err) { return db.rollback(() => { reject(err); }); }

        const match = results as RowDataPacket[];

        if (!match[0]) {
          db.rollback(() => {
            reject('Match does not exists')
          });
        }
      });

      db.query('DELETE FROM juega WHERE id_partido = ?', [matchId], (err, _results) => {
        if (err) { return db.rollback(() => { reject(err); }); }

        const teamsPromises = teamIds.map(teamId => {
          return new Promise<void>((resolve, reject) => {
            db.query('SELECT * FROM equipo WHERE id = ?', [teamId], (err, results) => {
              if (err) { return db.rollback(() => { reject(err); }); }

              const team = results as RowDataPacket[];

              if (!team[0]) {
                db.rollback(() => {
                  reject(`Team(${teamId}) does not exists`)
                });
              }
            });

            db.query(`INSERT INTO juega (id_partido, id_equipo) VALUES (?, ?)`,
            [matchId, teamId], (err, _results) => {
              if (err) { return db.rollback(() => { reject(err); }); }

              matchTeams.teamIds.push(teamId);

              resolve();
            });
          });
        });

        Promise.all(teamsPromises).then(() => {
          db.commit(err => {
            if (err) { return db.rollback(() => { reject(err); }); }

            resolve(matchTeams);
          }); }).catch(err => {
            db.rollback(() => { reject(err); });
          });
      });
    });
  });
}

export { getMatchesAndPredictions, getAllMatches, updateMatchTeams};
