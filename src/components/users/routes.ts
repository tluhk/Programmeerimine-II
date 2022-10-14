import express from 'express';
import usersControllers from './controllers';
import usersMiddlewares from './middlewares';

import authMiddleware
 from '../auth/middlewares';

const usersRoutes = express.Router();

usersRoutes
    .get('/', authMiddleware.isAdmin, usersControllers.getAllUsers)
    .get('/:id', usersControllers.getUserById)
    .post('/', usersMiddlewares.checkCreateUserData, usersControllers.createUser)
    .patch('/:id', usersControllers.updateUser)
    .delete('/:id', usersControllers.deleteUser);

export default usersRoutes;
