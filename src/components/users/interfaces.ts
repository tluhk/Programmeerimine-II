import { RowDataPacket } from 'mysql2';

interface IUser {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: 'Admin' | 'User';
}

interface IUserSQL extends IUser, RowDataPacket {}

export { IUser, IUserSQL };
