import db from '../config/database';
import { RowDataPacket } from 'mysql2';

interface User {
  document: string;
  name: string;
  email: string;
  password: string;
}

const getAllUsers = (): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM usuario', (err, results) => {
      if (err) { return reject(err); }

      const users = results as RowDataPacket[];

      resolve(users as User[]);
    });
  });
};

const getUserByEmail = (email: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    db.query('SELECT documento, nombre, email, contraseña AS password FROM usuario WHERE email = ?', [email], (err, results) => {
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

export { getAllUsers, getUserByEmail, createUser, getUserByEmailOrDocument, User };
