import { Request, Response } from 'express';
import commentsService from '../comments/services';
import { IPost, IPostSQL } from './interfaces';
import postsService from './services';

const postsController = {
  getAllPosts: async (req: Request, res: Response) => {
    const postsWithStatusesAndUsers = await postsService.getAllPosts();
    res.status(200).json({
      success: true,
      message: 'List of posts',
      posts: postsWithStatusesAndUsers,
    });
  },
  getPostById: async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const post = await postsService.getPostById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Post',
      data: {
        post,
      },
    });
  },
  getPostComment: async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const comments = await commentsService.findCommentsByPostId(id);
    return res.status(200).json({
      success: true,
      message: `Comments of post with id: ${id}`,
      data: {
        comments,
      },
    });
  },
  createPost: async (req: Request, res: Response) => {
    const {
      title, content, userId, statusId,
    } = req.body;
    if (!title || !content || !userId || !statusId) {
      return res.status(400).json({
        success: false,
        message: 'Some data is missing (title, content, userId, statusId)',
      });
    }
    const newPost: IPost = {
      title,
      content,
      userId,
      statusId,
    };
    const id = await postsService.createPost(newPost);
    return res.status(201).json({
      success: true,
      message: `Post with id ${id} created`,
    });
  },
  updatePost: async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const { title, content, statusId } = req.body;
    const post = await postsService.getPostById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }
    if (!title && !content && !statusId) {
      return res.status(400).json({
        success: false,
        message: 'Nothing to change',
      });
    }
    const postToUpdate: IPost = {
      id,
      title,
      content,
      statusId,
    };

    await postsService.updatePost(postToUpdate);

    return res.status(200).json({
      success: true,
      message: 'Post updated',
    });
  },
  deletePost: async  (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const result = await postsService.deletePost(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Post deleted',
    });
  },
};

export default postsController;
