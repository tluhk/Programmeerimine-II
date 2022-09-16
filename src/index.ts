import express, { Request, Response } from 'express';
import { createModuleResolutionCache } from 'typescript';
const app = express();
const PORT = 3000;

app.use(express.json());

interface INewUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface IUser extends INewUser {
    id: number;
}

const users: IUser[] = [
    {
        id: 1,
        firstName: 'Juhan',
        lastName: 'Juurikas',
        email: 'juhan@juurikas.ee',
        password: 'juhan',
    },
];

// Endpoint API töötamise kontrollimisek
app.get('/api/v1/health', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Hello world!',
    });
});

// Kõikide kasutajate pärimise endpoint
app.get('/api/v1/users', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'List of users',
        users
    });
});

// Kasutaja pärimine id alusel
app.get('/api/v1/users/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = users.find(element => {
        return element.id === id;
    });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User not found`,
        });
    }
    return res.status(200).json({
        success: true,
        message: `User`,
        data: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        }
    });
});


// Kasutaja muutmine
app.patch('/api/v1/users/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { firstName, lastName, email, password } = req.body;
    const user = users.find(element => {
        return element.id === id;
    });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User not found`,
        });
    }
    if (!firstName && !lastName && !email && !password) {
        return res.status(400).json({
            success: false,
            message: `Nothing to change`,
        });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (password) user.password = password;

    return res.status(200).json({
        success: true,
        message: `User updated`,
    });
});

// Kasutaja loomine
app.post('/api/v1/users', (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
            success: false,
            message: `Some data is missing (firstName, lastName, email, password)`,
        });
    }
    const id = users.length + 1;
    const newUser: IUser = {
        id,
        firstName,
        lastName,
        email,
        password
    };
    users.push(newUser);

    return res.status(201).json({
        success: true,
        message: `User with id ${newUser.id} created`,
    });
});

// Kasutaja kustutamine
app.delete('/api/v1/users/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(element => element.id === id);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `User not found`,
        });
    }
    users.splice(index, 1);
    return res.status(200).json({
        success: true,
        message: `User deleted`,
    });
});

app.listen(PORT, () => {
    console.log('Server is running');
});
