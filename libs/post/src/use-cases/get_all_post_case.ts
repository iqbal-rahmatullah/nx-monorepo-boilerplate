import { AuthRequest, ServerLogger } from '@stores/shared';
import { NextFunction, Response } from 'express';
import { IPostService } from '../services/IPostService';
import { PostService } from '../services/PostService';

export const getAllPostCase = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const logger = new ServerLogger();

  const postRepository: IPostService = new PostService();

  try {
    const post = await postRepository.getAllPosts();

    res.status(200).json({
      message: 'Posts retrieved successfully',
      data: post,
    });
  } catch (error) {
    next(error);
  }
};
