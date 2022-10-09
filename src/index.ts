import express, { Request, Response, NextFunction } from 'express';
import { IUser } from './components/users/interfaces';
import { IComment } from './components/comments/interfaces';
import { postStatuses, comments } from './mockData';
import usersServices from './components/users/services';
import usersControllers from './components/users/controllers';
import usersMiddlewares from './components/users/middlewares';
import postsController from './components/posts/controllers';
import postStatusesController from './components/postsStatuses/controllers';

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
app.get('/api/v1/comments', (req: Request, res: Response) => {
    const commentsWithUsers = comments.map(comment => {
        let user: IUser | undefined = usersServices.findUserById(comment.id);
        if (!user) user = usersServices.unknownUser();
        const userWithoutPassword = usersServices.getUserWithoutPassword(user);
        const commentWithUser = {
            id: comment.id,
            content: comment.content,
            user: userWithoutPassword,
        };
        return commentWithUser;
    });

    res.status(200).json({
        success: true,
        message: 'List of all comments',
        comments: commentsWithUsers,
    });
});

// Kommentaari pärimine id alusel
app.get('/api/v1/comments/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const comment = getCommentById(id);
    if (!comment) {
        return res.status(404).json({
            success: false,
            message: `Comment not found`,
        });
    }
    return res.status(200).json({
        success: true,
        message: `Comment`,
        data: {
            comment,
        },
    });
});

// Postitusega seotud kommentaaride pärimise endpoint
app.get('/api/v1/posts/:id/comments', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const comments = findCommentsByPostId(id);
    return res.status(200).json({
        success: true,
        message: `Comments of post with id: ${id}`,
        data: {
            comments,
        },
    });
});

// Kommentaari loomine
app.post('/api/v1/comments', (req: Request, res: Response) => {
    const { postId, content } = req.body;
    let { userId } = req.body;
    if (!postId || !content) {
        return res.status(400).json({
            success: false,
            message: `Some data is missing (postId, content)`,
        });
    }
    if (!userId) userId = null;
    const id = comments.length + 1;
    const comment: IComment = {
        id,
        userId,
        postId,
        content,
    };
    comments.push(comment);

    return res.status(201).json({
        success: true,
        message: `comment with id ${comment.id} created`,
    });
});

// Kommentaari kustutamine
app.delete('/api/v1/comments/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = comments.findIndex(element => element.id === id);
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `Comment not found`,
        });
    }
    comments.splice(index, 1);
    return res.status(200).json({
        success: true,
        message: `Comment deleted`,
    });
});

/*
--------------------------------------------------
Kommentaaridega seotud funktsioonid
--------------------------------------------------
*/
const getCommentById = (id: number): IComment | undefined => {
    const comment = comments.find(element => {
        return element.id === id;
    });
    return comment;
};

const findCommentsByPostId = (id: number): IComment[] => {
    const postComments = comments.filter(comment => comment.postId === id);
    return postComments;
}

app.listen(PORT, () => {
    console.log('Server is running');
});
