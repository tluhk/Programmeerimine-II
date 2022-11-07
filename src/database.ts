import mysql from 'mysql2';
import config from './apiConfig';
require("dotenv").config();

const test = process.env.TEST;

const dbConfig = {
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: test || config.db.database,
  port: config.db.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
};

const pool = mysql.createPool(dbConfig).promise();

export default pool;
