import pool from '../../database';
import { FieldPacket, ResultSetHeader } from 'mysql2';
import authServices from '../auth/services';
import { IUser, IUserSQL } from './interfaces';

const usersServices = {
  findUserById: async (id: number) => {
    const [user]: [IUserSQL[], FieldPacket[]] = await pool.query(`SELECT id, firstName, lastName, email, role, createdDate FROM users WHERE id=? AND deletedDate IS NULL;`, [id]);
    return user[0];
  },
  findUserByEmail: async (email: string) => {
    const [user]: [IUserSQL[], FieldPacket[]] = await pool.query(`SELECT id, email, password, role FROM users WHERE email=? AND deletedDate IS NULL;`, [email]);
    return user[0];
  },
  getAllUsers: async () => {
    const [users]: [IUserSQL[], FieldPacket[]] = await pool.query('SELECT id, firstName, lastName, email, role, createdDate FROM users WHERE deletedDate IS NULL;');
    return users;
  },
  createUser: async (user: IUser): Promise<number | Boolean> => {
    const hashedPassword = await authServices.hash(user.password);
    const newUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: hashedPassword,
      role: 'User',
    };
    const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('INSERT INTO users SET ?;', [newUser]);
    return false;
    return result.insertId;
  },
  updateUser: async (userToUpdate: IUser): Promise<Boolean> => {
    const {
      id, firstName, lastName, email, password
    } = userToUpdate;
    const user = await usersServices.findUserById(id!);

    let hashedPassword = null;
    if (password) {
      hashedPassword = await authServices.hash(password);
    }
    const update = {
      firstName: firstName || user.firstName,
      lastName: lastName|| user.lastName,
      email: email || user.email,
      password: hashedPassword || user.password,
    };

    const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('UPDATE users SET ? WHERE id=?;', [update, id]);
    if (result.affectedRows < 1) {
      return false;
    }
    return true;
  },
  deleteUser: async (id: number): Promise<Boolean> => {
    const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('UPDATE users SET deletedDate=? WHERE id=?;', [new Date(), id]);
    if (result.affectedRows < 1) {
      return false;
    }
    return true;
  },
};

export default usersServices;
