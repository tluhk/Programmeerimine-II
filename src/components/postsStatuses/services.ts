import { FieldPacket } from 'mysql2';
import { IPostStatusSQL  } from './interfaces';
import pool from '../../database';

const postStatusesService = {
  getAllPostStatuses: async (): Promise<IPostStatusSQL[]> => {
    const [statuses]: [IPostStatusSQL[], FieldPacket[]] = await pool.query('SELECT * FROM statuses WHERE deletedDate IS NULL;');
    return statuses;
  },
  getPostStatusById: async (id: number): Promise<IPostStatusSQL> => {
    const [statuses]: [IPostStatusSQL[], FieldPacket[]] = await pool.query('SELECT * FROM statuses WHERE id = ? AND deletedDate IS NULL;', [id]);
    return statuses[0];
  },
};

export default postStatusesService;
