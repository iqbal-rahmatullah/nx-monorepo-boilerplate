import { Post } from '@prisma/client';
import { CreatePostDto } from '../dto/create_post_dto';
import { IPostService } from './IPostService';
import { IPostRepository } from '../repository/IPostRepository';
import { PostRepository } from '../repository/PostRepository';
import {
  AuthRequest,
  NotFoundException,
  ServerLogger,
  UnauthorizedException,
} from '@stores/shared';

export class PostService implements IPostService {
  postRepository: IPostRepository = new PostRepository();
  logger = new ServerLogger();

  async addPost(data: CreatePostDto): Promise<Post> {
    const createdPost = await this.postRepository.addPost(data);

    return createdPost;
  }

  async getAllPosts(): Promise<Post[]> {
    const posts = await this.postRepository.getAllPosts();

    if (!posts.length) {
      throw new NotFoundException('No posts found');
    }

    return posts;
  }

  async getDetailPost(id: string): Promise<Post | null> {
    const post = await this.postRepository.getDetailPost(id);

    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return post;
  }

  async updatePost(
    id: string,
    data: Omit<CreatePostDto, 'authorId'>,
    req: AuthRequest
  ): Promise<Post> {
    const findPost = await this.postRepository.getDetailPost(id);

    if (!findPost) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    if (findPost.authorId !== req.user.id) {
      throw new UnauthorizedException(
        `You are not authorized to update this post`
      );
    }

    const updatedPost = await this.postRepository.updatePost(id, data);

    if (!updatedPost) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return updatedPost;
  }

  async deletedPost(id: string, req: AuthRequest): Promise<void> {
    const findPost = await this.postRepository.getDetailPost(id);

    if (!findPost) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    if (findPost.authorId !== req.user.id) {
      throw new UnauthorizedException(
        `You are not authorized to delete this post`
      );
    }

    await this.postRepository.deletePost(findPost.id);
  }
}
