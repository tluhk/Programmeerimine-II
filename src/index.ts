import express from 'express';
import cors from 'cors';
import logger from './components/general/middlewares';
import usersRoutes from './components/users/routes';
import postStatusesRoutes from './components/postsStatuses/routes';
import commentsRoutes from './components/comments/routes';
import postsRoutes from './components/posts/routes';
import generalRoutes from './components/general/routes';
import authController from './components/auth/controllers';
import authMiddleware from './components/auth/middlewares';

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../apidocs/openApi.json');

const app = express();
const PORT = 3000;
const apiPath = '/api/v1';

app.use(cors());
app.use(express.json());
app.use(`${apiPath}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(logger);

app.post(`${apiPath}/login`, authController.login);
app.use(`${apiPath}/health`, generalRoutes);
app.use(authMiddleware.isLoggedIn);
app.use(`${apiPath}/users`, usersRoutes);
app.use(`${apiPath}/postStatuses`, postStatusesRoutes);
app.use(`${apiPath}/comments`, commentsRoutes);
app.use(`${apiPath}/posts`, postsRoutes);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running');
});
