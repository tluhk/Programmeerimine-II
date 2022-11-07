import pool from '../src/database';
import fs from 'fs';
import path from 'path';

(async () => {
  try {
    const sqlPath = path.join(__dirname, '../apidocs/databaseModel/createTestDb.sql');
    const sql = await fs.readFileSync(sqlPath, 'utf8');
    await pool.query(sql);
    console.log('Ready for action');
  } catch (error) {
    console.log(error);
  }
})();
