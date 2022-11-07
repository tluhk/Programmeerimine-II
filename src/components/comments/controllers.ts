import { Request, Response } from 'express';
import { IComment } from './interfaces';
import commentsService from './services';

const commentsController = {
  getAllComments: async (req: Request, res: Response) => {
    const comments = await commentsService.getAllComments();

    res.status(200).json({
      success: true,
      message: 'List of all comments',
      comments,
    });
  },
  getCommentById: async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const comment = await commentsService.getCommentById(id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Comment',
      data: {
        comment,
      },
    });
  },
  createComment: async (req: Request, res: Response) => {
    const { postId, content } = req.body;
    let userId = res.locals.user?.id || null;
    if (!postId || !content) {
      return res.status(400).json({
        success: false,
        message: 'Some data is missing (postId, content)',
      });
    }

    const newComment: IComment = {
      userId,
      postId,
      content,
    };

    const id: number = await commentsService.createComment(newComment);

    return res.status(201).json({
      success: true,
      message: `comment with id ${id} created`,
    });
  },
  deleteComment: async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const result = await commentsService.deleteComment(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Comment deleted',
    });
  },
};

export default commentsController;
