import { Request, Response } from 'express';
import { INewUser, IUser, IUserWithoutRole } from './interfaces';
import usersServices from './services';

const usersControllers = {
  getAllUsers: async (req: Request, res: Response) => {
    if (res.locals.user.role === 'Admin') {
      const users = await usersServices.getAllUsers();
      return res.status(200).json({
        success: true,
        message: 'List of users',
        users,
      });
    }
    const { id } = res.locals.user;
    const user = usersServices.findUserById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'List of users',
      user,
    });
  },
  getUserById: async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const user = await usersServices.findUserById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'User',
      data: {
        user,
      },
    });
  },
  createUser: async (req: Request, res: Response) => {
    const {
      firstName, lastName, email, password,
    } = req.body;
    const newUser: INewUser = {
      firstName,
      lastName,
      email,
      password,
      role: 'User',
    };
    const id = await usersServices.createUser(newUser);
    return res.status(201).json({
      success: true,
      message: `User with id ${id} created`,
    });
  },
  updateUser: async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const {
      firstName, lastName, email, password,
    } = req.body;
    const user = await usersServices.findUserById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    if (!firstName && !lastName && !email && !password) {
      return res.status(400).json({
        success: false,
        message: 'Nothing to change',
      });
    }

    const userToUpdate: IUserWithoutRole = {
      id,
      firstName,
      lastName,
      email,
      password,
    };

    usersServices.updateUser(userToUpdate);

    return res.status(200).json({
      success: true,
      message: 'User updated',
    });
  },
  deleteUser: async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const user = await usersServices.findUserById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    const result = await usersServices.deleteUser(id);

    return res.status(200).json({
      success: true,
      message: 'User deleted',
    });
  },
};

export default usersControllers;
