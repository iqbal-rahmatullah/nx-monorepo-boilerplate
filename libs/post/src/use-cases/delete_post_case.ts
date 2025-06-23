import { AuthRequest } from '@stores/shared';
import { NextFunction, Response } from 'express';
import { IPostService } from '../services/IPostService';
import { PostService } from '../services/PostService';

export const deletePostCase = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const postService: IPostService = new PostService();

  try {
    await postService.deletedPost(req.params.id, req);

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
