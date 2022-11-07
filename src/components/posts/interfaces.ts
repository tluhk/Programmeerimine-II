import { RowDataPacket } from 'mysql2';

interface IPost {
    id?: number;
    userId?: number;
    title?: string;
    content?: string;
    statusId?: number;
}

interface IPostSQL extends IPost, RowDataPacket {}

export { IPost, IPostSQL };
