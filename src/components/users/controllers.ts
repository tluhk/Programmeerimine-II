import { NextFunction, Request, Response } from 'express';
import { IUser } from './interfaces';
import usersServices from './services';

const usersControllers = {
  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let users;
      if (res.locals.user.role === 'Admin') {
        users = await usersServices.getAllUsers();
      } else {
        const { id } = res.locals.user;
        users = usersServices.findUserById(id);
      }

      return res.status(200).json({
        success: true,
        message: 'List of users',
        users,
      });
    } catch (error) {
      next(error);
    }
    
  },
  getUserById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const user = await usersServices.findUserById(id);
      if (!user) throw new Error('User not found');
      return res.status(200).json({
        success: true,
        message: 'User',
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        firstName, lastName, email, password,
      } = req.body;
      const newUser: IUser = {
        firstName,
        lastName,
        email,
        password,
        role: 'User',
      };
      const id = await usersServices.createUser(newUser);
      if (!id) throw new Error('Something happened while creating user.');
      return res.status(201).json({
        success: true,
        message: `User with id ${id} created`,
      });
    } catch (error) {
      next(error);
    }
    
  },
  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
    const {
      firstName, lastName, email, password,
    } = req.body;

    const user = await usersServices.findUserById(id);
    if (!user) throw new Error('User not found');
    if (!firstName && !lastName && !email && !password) throw new Error('Nothing to change');

    const userToUpdate: IUser = {
      id,
      firstName,
      lastName,
      email,
      password,
    };

    const result = usersServices.updateUser(userToUpdate);
    if (!result) throw new Error('Something happened while updating user');
    return res.status(200).json({
      success: true,
      message: 'User updated',
    });
    } catch (error) {
      next(error);
    }
  },
  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      const user = await usersServices.findUserById(id);
      if (!user) throw new Error('User not found');
      const result = await usersServices.deleteUser(id);
      if (!result) throw new Error('Something happened while deleting user');
      return res.status(200).json({
        success: true,
        message: 'User deleted',
      });
    } catch (error) {
      next(error);
    }
  },
};

export default usersControllers;
