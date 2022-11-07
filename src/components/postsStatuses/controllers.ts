import { Request, Response } from 'express';
import { IPostStatus } from './interfaces';
import postStatusesService from './services';

const postStatusesController = {
  getAllPostStatuses: async (req: Request, res: Response) => {
    const postStatuses: IPostStatus[] = await postStatusesService.getAllPostStatuses();
    res.status(200).json({
      success: true,
      message: 'List of post statuses',
      postStatuses,
    });
  },
  getPostStatusById: async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const postStatus: IPostStatus | undefined = await postStatusesService.getPostStatusById(id);
    if (!postStatus) {
      return res.status(404).json({
        success: false,
        message: 'Post status not found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Post status',
      data: {
        postStatus,
      },
    });
  },
};

export default postStatusesController;
