import { users } from "../../mockData";
import authServices from "../auth/services";
import { INewUser, IUser, IUserWithoutPassword, IUserWithoutRole } from "./interfaces";

const usersServices = {
    findUserById: (id: number): IUser | undefined => {
        const user: IUser | undefined = users.find(element => element.id === id);
        return user;
    },
    findUserByEmail: (email: string): IUser | undefined => {
        const user: IUser | undefined = users.find(element => element.email === email);
        return user;
    },
    getUserWithoutPassword: (user: IUser): IUserWithoutPassword => {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        };
    },
    unknownUser: (): IUser => {
        return {
                id: 0,
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'jane@doe.com',
                password: 'jane',
                role: 'User',
            };
    },
    getAllUsers: () => {
        const usersWithoutPassword = users.map(user => {
            const userWithoutPassword = usersServices.getUserWithoutPassword(user);
            return userWithoutPassword;
        });
        return usersWithoutPassword;
    },
    createUser: async (user: INewUser): Promise<number> => {
        const id = users.length + 1;
        const hashedPassword = await authServices.hash(user.password);
        const newUser: IUser = {
            id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: hashedPassword,
            role: 'User',
        };
        users.push(newUser);
        return id;
    },
    updateUser: (userToUpdate: IUserWithoutRole ): Boolean => {
        const { id, firstName, lastName, email, password } = userToUpdate;
        const user = usersServices.findUserById(id);
        if (user && firstName) user.firstName = firstName;
        if (user && lastName) user.lastName = lastName;
        if (user && email) user.email = email;
        if (user && password) user.password = password;
        return true;
    },
    deleteUser: (id: number): Boolean => {
        const index = users.findIndex(element => element.id === id);
        if(index === -1) return false;
        users.splice(index, 1);
        return true;
    }
};

export default usersServices;
