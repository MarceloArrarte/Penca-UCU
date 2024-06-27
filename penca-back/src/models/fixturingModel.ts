import db from '../config/database';
import { RowDataPacket } from 'mysql2';


interface Team {
  teamId: number;
  country: string;
  group: string;
  playedMatchs: number;
  winMatchs: number;
  drawMatchs: number;
  lostMatchs: number;
  score: number;
}

interface Group {
  group: string;
  teams: Team[];
}

interface Match {
  teamId1: number;
  teamId2: number;
  goals1: number;
  goals2: number;
}


const getAllTeams = (): Promise<Team[]> => {
  return new Promise((resolve, reject) => {
    db.query('SELECT id, pais, grupo FROM equipo', (err, results) => {
      if (err) { return reject(err); }

      const rows = results as RowDataPacket[];

      const teams = rows.map(row => ({
        teamId: row.id,
        country: row.pais,
        group: row.grupo,
        playedMatchs: 0,
        winMatchs: 0,
        drawMatchs: 0,
        lostMatchs: 0,
        score: 0
      }));

      resolve(teams);
    });
  });
};

const getAllMatches = (): Promise<Match[]> => {
  return new Promise((resolve, reject) => {
    db.query(`
      SELECT j1.id_equipo AS equipo1, j2.id_equipo AS equipo2, j1.goles AS goles1, j2.goles AS goles2 FROM partido p
      INNER JOIN juega j1 ON j1.id_partido = p.id
      INNER JOIN juega j2 ON j2.id_partido = p.id AND j2.id_equipo != j1.id_equipo
      WHERE j1.goles IS NOT NULL AND j2.goles IS NOT NULL
    `, (err, results) => {
      if (err) { return reject(err); }

      const rows = results as RowDataPacket[];

      const matches = rows.map(row => ({
        teamId1: row.equipo1,
        teamId2: row.equipo2,
        goals1: row.goles1,
        goals2: row.goles2
      }));

      resolve(matches);
    });
  });
};

const getFixturing = (): Promise<Group[]> => {
  return new Promise((resolve, reject) => {
    getAllTeams().then(teams => {
      getAllMatches().then(matchs => {
        matchs.forEach(match => {
          const team1 = teams.find(equipo => equipo.teamId === match.teamId1);
          const team2 = teams.find(equipo => equipo.teamId === match.teamId2);

          if (team1 && team2) {
            team1.playedMatchs++; team2.playedMatchs++;

            if (match.goals1 > match.goals2) {
              team1.winMatchs++;
              team2.lostMatchs++;
              team1.score += 3;
            } else if (match.goals1 < match.goals2) {
              team2.winMatchs++;
              team1.lostMatchs++;
              team2.score += 3;
            } else {
              team1.drawMatchs++; team2.drawMatchs++;
              team1.score += 1; team2.score += 1;
            }
          }
        });

        const groupsMap: { [key: string]: Team[] } = teams.reduce((acc: { [key: string]: Team[] }, team) => {
          if (!acc[team.group]) { acc[team.group] = []; }
          acc[team.group].push(team);
          return acc;
        }, {});

        const groups: Group[] = Object.keys(groupsMap).map(group => ({
          group, teams: groupsMap[group].sort((a, b) => {
            return b.score - a.score
          })
        }));

        resolve(groups);
      }).catch(reject);
    }).catch(reject);
  });
};

export { getFixturing }
