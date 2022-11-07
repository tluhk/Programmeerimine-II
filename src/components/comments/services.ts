import { IComment, ICommentSQL } from './interfaces';
import pool from '../../database';
import { FieldPacket, ResultSetHeader } from 'mysql2';

const commentsService = {
  getAllComments: async (): Promise<ICommentSQL[]> => {
    const [comments]: [ICommentSQL[], FieldPacket[]] = await pool.query(
      `SELECT
        C.id, C.content, C.createdDate, U.id AS userId, U.firstName, U.lastName
        FROM
          comments C
        INNER JOIN
          users U ON C.userId = U.id
        WHERE C.deletedDate IS NULL;`
      );
    return comments;
  },
  getCommentById: async (id: number): Promise<ICommentSQL> => {
    const [comments]: [ICommentSQL[], FieldPacket[]] = await pool.query(
      `SELECT
        C.id, C.content, C.createdDate, U.id AS userId, U.firstName, U.lastName
        FROM
          comments C
        INNER JOIN
          users U ON C.userId = U.id
        WHERE C.id = ? AND C.deletedDate IS NULL;`, [id]);
    return comments[0];
  },
  findCommentsByPostId: async (id: number): Promise<ICommentSQL[]> => {
    const [comments]: [ICommentSQL[], FieldPacket[]] = await pool.query(
      `SELECT
        C.id, C.content, C.createdDate, U.id AS userId, U.firstName, U.lastName
        FROM
          comments C
        INNER JOIN
          users U ON C.userId = U.id
        WHERE C.postId = ? AND C.deletedDate IS NULL;`, [id]);
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
