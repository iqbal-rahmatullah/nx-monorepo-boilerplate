import { AuthRequest, ValidationParse } from '@stores/shared';
import { NextFunction, Response } from 'express';
import { postValidator } from '../validator/post_validator';
import { CreatePostDto } from '../dto/create_post_dto';
import { IPostService } from '../services/IPostService';
import { PostService } from '../services/PostService';

export const addPostCase = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const postService: IPostService = new PostService();

  try {
    const createdPostDto = new CreatePostDto({
      authorId: req.user.id ?? null,
      title: req.body.title,
      content: req.body.content,
    });

    ValidationParse.validate(postValidator, createdPostDto);

    const createdPost = await postService.addPost(createdPostDto);

    res.status(201).json({
      message: 'Post created successfully',
      data: createdPost,
    });
  } catch (error) {
    next(error);
  }
};
