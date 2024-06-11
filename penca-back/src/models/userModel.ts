import db from '../config/database';
import { RowDataPacket } from 'mysql2';

interface User {
  document: number;
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
    db.query('SELECT * FROM usuario WHERE email = ?', [email], (err, results) => {
      if (err) { return reject(err); }

      const users = results as RowDataPacket[];

      resolve(users[0] as User);
    });
  });
};

const getUserByEmailOrDocument = (email: string, document: number): Promise<User> => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM usuario WHERE email = ? OR documento = ?', [email, document], (err, results) => {
      if (err) { return reject(err); }

      const users = results as RowDataPacket[];

      console.log(users);

      resolve(users[0] as User);
    });
  });
};

const createUser = (document: number, name: string, email: string, hashedPassword: string,
                    championId: number, runnerUpId: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO usuario (documento, nombre, email, contraseña) values (?, ?, ?, ?)',
    [document, name, email, hashedPassword],
    (err, result) => {
      if (err) { return reject(err); }

      db.query('INSERT INTO alumno (documento_usuario, id_campeon, id_subcampeon) values (?, ?, ?)',
      [document, championId, runnerUpId],
      (err, _result) => {

        if (err) { return reject(err); }

        resolve()
      });
    });
  });
};

export { getAllUsers, getUserByEmail, createUser, getUserByEmailOrDocument, User };
