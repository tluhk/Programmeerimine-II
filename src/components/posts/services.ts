import { FieldPacket, ResultSetHeader } from 'mysql2';
import pool from '../../database';
import { IPost, IPostSQL } from './interfaces';

const postsService = {
  getAllPosts: async (): Promise<IPostSQL[]> => {
    const [posts]: [IPostSQL[], FieldPacket[]] = await pool.query(
      `SELECT
      P.id, P.title, P.content, P.createdDate, U.id AS userId, U.firstName, U.lastName
      FROM
        posts P
      INNER JOIN
        users U ON P.userId = U.id
      WHERE P.deletedDate IS NULL;`
    );
    return posts;
  },
  getPostById: async (id: number): Promise<IPostSQL> => {
    const [posts]: [IPostSQL[], FieldPacket[]] = await pool.query(
      `SELECT
      P.id, P.title, P.content, P.createdDate, U.id AS userId, U.firstName, U.lastName
      FROM
        posts P
      INNER JOIN
        users U ON P.userId = U.id
      WHERE P.id = ? AND P.deletedDate IS NULL;`, [id]
      );
    return posts[0];
  },
  createPost: async (post: IPost): Promise<number> => {
    const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('INSERT INTO posts SET ?;', [post]);
    return result.insertId;
  },
  updatePost: async (postToUpdate: IPost) => {
    const {
      id, title, content, statusId,
    } = postToUpdate;
    const post = await postsService.getPostById(id!);

    const update = {
      title: title || post.title,
      content: content|| post.content,
      statusId: statusId || post.statusId,
    };
    
    const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('UPDATE posts SET ? WHERE id = ?;', [update, id]);
    if (result.affectedRows < 1) {
      return false;
    }
    return true;
  },
  deletePost: async (id: number): Promise<Boolean> => {
    const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('UPDATE posts SET deletedDate = ? WHERE id = ?;', [Date.now(), id]);
    if (result.affectedRows < 1) {
      return false;
    }
    return true;
  },
};

export default postsService;
