import { Request, Response, NextFunction } from 'express';

const usersMiddlewares = {
  checkCreateUserData: (req: Request, res: Response, next: NextFunction) => {
    const {
      firstName, lastName, email, password,
    } = req.body;
    if (!firstName || !lastName || !email || !password) {
      throw new Error('Some data is missing (firstName, lastName, email, password)');
    }
    return next();
  },
};

export default usersMiddlewares;
