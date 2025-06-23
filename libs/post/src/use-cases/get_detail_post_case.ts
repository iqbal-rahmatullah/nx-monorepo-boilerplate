import { AuthRequest } from '@stores/shared';
import { NextFunction, Response } from 'express';
import { IPostService } from '../services/IPostService';
import { PostService } from '../services/PostService';

export const getDetailPostCase = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const postService: IPostService = new PostService();

  try {
    const post = await postService.getDetailPost(req.params.id);

    res.status(200).json({
      message: 'Post retrieved successfully',
      data: post,
    });
  } catch (error) {
    next(error);
  }
};
