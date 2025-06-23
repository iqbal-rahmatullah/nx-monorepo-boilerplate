import { AuthRequest, ValidationParse } from '@stores/shared';
import { NextFunction, Response } from 'express';
import { IPostService } from '../services/IPostService';
import { PostService } from '../services/PostService';
import {
  postValidator,
  updatePostValidator,
} from '../validator/post_validator';
import { CreatePostDto } from '../dto/create_post_dto';

export const patchPostCase = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const postService: IPostService = new PostService();

    const validatedData = ValidationParse.validate(
      updatePostValidator,
      req.body
    );
    const postDto: CreatePostDto = new CreatePostDto(validatedData);

    const updatedPost = await postService.updatePost(
      req.params.id,
      postDto,
      req
    );

    res.status(200).json({
      message: 'Post updated successfully',
      data: updatedPost,
    });
  } catch (error) {
    next(error);
  }
};
