import { RowDataPacket } from 'mysql2';

interface IPostStatus {
    id?: number;
    status: string;
}

interface IPostStatusSQL extends IPostStatus, RowDataPacket {}

export { IPostStatus, IPostStatusSQL };
