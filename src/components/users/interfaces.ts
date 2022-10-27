import { RowDataPacket } from 'mysql2';

interface INewUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'Admin' | 'User';
}

interface IUser extends INewUser {
    id: number;
}

interface INewUserSQL {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'Admin' | 'User';
}

interface IUserSQL extends INewUser, RowDataPacket {
    id: number;
}

interface IUserWithoutRole {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface IUserWithoutPassword {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: 'Admin' | 'User';
}

export {
  INewUser, IUser, IUserWithoutPassword, IUserWithoutRole, IUserSQL, INewUserSQL
};
