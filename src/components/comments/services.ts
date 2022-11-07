import { comments } from '../../mockData';
import usersServices from '../users/services';
import { IComment, ICommentSQL } from './interfaces';
import pool from '../../database';
import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

const commentsService = {
  getAllComments: async (): Promise<ICommentSQL[]> => {
    const [comments]: [ICommentSQL[], FieldPacket[]] = await pool.query('SELECT * FROM comments WHERE deletedDate IS NULL;');
    return comments;
  },
  getCommentById: async (id: number): Promise<ICommentSQL> => {
    const [comments]: [ICommentSQL[], FieldPacket[]] = await pool.query('SELECT * FROM comments WHERE id = ? AND deletedDate IS NULL;', [id]);
    return comments[0];
  },
  findCommentsByPostId: async (id: number): Promise<ICommentSQL[]> => {
    const [comments]: [ICommentSQL[], FieldPacket[]] = await pool.query('SELECT * FROM comments WHERE postId = ? AND deletedDate IS NULL;', [id]);
    return comments;
  },
  createComment: async  (newComment: IComment): Promise<number> => {
    const comment: IComment = {
      ...newComment,
    };
    const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('INSERT INTO comments SET ?;', [comment]);
    return result.insertId;
  },
  deleteComment: async (id: number): Promise<Boolean> => {
    const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('UPDATE comments SET deletedDate = ? WHERE id = ?;', [Date.now(), id]);
    if (result.affectedRows < 1) {
      return false;
    }
    return true;
  },
};

export default commentsService;
