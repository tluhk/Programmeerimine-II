const config = {
  port: 3000,
  jwtSecret: 'EnterSecretHere',
  saltRounds: 10,
  apiPath: '/api/v1',
  db: {
    user: 'user',
    password: 'password',
    database: 'database',
    host: 'host',
    port: 3306,
  },
};

export default config;
