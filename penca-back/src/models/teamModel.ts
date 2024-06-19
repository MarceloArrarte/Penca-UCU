import db from '../config/database';

interface Team {
    id: number;
    pais: string;
}


const getAllTeams = () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT id, pais FROM equipo', (err, results) => {
        if (err) { return reject(err); }
  
        const teams: Team[] = results as Team[];
  
        resolve(teams);
      });
    });
};

export { Team, getAllTeams };