import { Request, Response } from "express";
import usersServices from "../users/services";
import authServices from "./services";

const authController = {
    login: async (req: Request, res: Response) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: `Some data is missing (email, password)`,
            });
        };
        const user = await usersServices.findUserByEmail(email);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            }); 
        }
        const match = await authServices.compare(password, user.password);
        if (!match) {
            return res.status(401).json({
                success: false,
                message: 'Wrong password',
            }); 
        }
        const token = await authServices.sign(user);
        return res.status(200).json({
            success: true,
            message: 'token',
            token,
        });
    },
};

export default authController;
