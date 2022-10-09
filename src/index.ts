import express, { Request, Response, NextFunction } from 'express';
import { IUser } from './components/users/interfaces';
import { IComment } from './components/comments/interfaces';
import { postStatuses, comments } from './mockData';
import usersServices from './components/users/services';
import usersControllers from './components/users/controllers';
import usersMiddlewares from './components/users/middlewares';
import postsController from './components/posts/controllers';
import postStatusesController from './components/postsStatuses/controllers';
import commentsController from './components/comments/controllers';

const app = express();
const PORT = 3000;

app.use(express.json());

const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);
    next();
};

app.use(logger);

// Endpoint API töötamise kontrollimiseks
app.get('/api/v1/health', logger, (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Hello world!',
    });
});

/*
--------------------------------------------------
Kasutajatega seotud endpoindid
--------------------------------------------------
*/
// Kõikide kasutajate pärimise endpoint
app.get('/api/v1/users', usersControllers.getAllUsers);
// Kasutaja pärimine id alusel
app.get('/api/v1/users/:id', usersControllers.getUserById);
// Kasutaja loomine
app.post('/api/v1/users', usersMiddlewares.checkCreateUserData, usersControllers.createUser);
// Kasutaja muutmine
app.patch('/api/v1/users/:id', usersControllers.updateUser);
// Kasutaja kustutamine
app.delete('/api/v1/users/:id', usersControllers.deleteUser);

/*
--------------------------------------------------
Postituste staatustega seotud endpoindid
--------------------------------------------------
*/
// Kõikide postituste staatuste pärimise endpoint
app.get('/api/v1/posts/statuses', postStatusesController.getAllPostStatuses);
// Postituse staatus pärimine staatuse id alusel
app.get('/api/v1/posts/statuses/:id', postStatusesController.getPostStatusById);

/*
--------------------------------------------------
Postitustega seotud endpoindid
--------------------------------------------------
*/
// Kõikide postituste pärimise endpoint
app.get('/api/v1/posts', postsController.getAllPosts);
// Postituse pärimine id alusel
app.get('/api/v1/posts/:id', postsController.getPostById);
// Postituse loomine
app.post('/api/v1/posts', postsController.createPost);
// Postituse muutmine
app.patch('/api/v1/posts/:id', postsController.updatePost);
// Postituse kustutamine
app.delete('/api/v1/posts/:id', postsController.deletePost);

/*
--------------------------------------------------
Kommentaaridega seotud endpoindid
--------------------------------------------------
*/
// Kõikide kommentaaride pärimise endpoint
app.get('/api/v1/comments', commentsController.getAllComments);
// Kommentaari pärimine id alusel
app.get('/api/v1/comments/:id', commentsController.getCommentById);
// Postitusega seotud kommentaaride pärimise endpoint
app.get('/api/v1/posts/:id/comments', commentsController.getPostComment);
// Kommentaari loomine
app.post('/api/v1/comments', commentsController.createComment);
// Kommentaari kustutamine
app.delete('/api/v1/comments/:id', commentsController.deleteComment);

app.listen(PORT, () => {
    console.log('Server is running');
});
