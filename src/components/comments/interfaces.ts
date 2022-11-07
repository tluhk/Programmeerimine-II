import { RowDataPacket } from 'mysql2';

interface IComment {
    id?: number;
    userId: number;
    postId: number;
    content: string;
}

interface ICommentSQL extends IComment, RowDataPacket {}

export { IComment, ICommentSQL };
