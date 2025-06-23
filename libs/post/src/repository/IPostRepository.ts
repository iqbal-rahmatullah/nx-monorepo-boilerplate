import { Post } from '@prisma/client';
import { CreatePostDto } from '../dto/create_post_dto';

export interface IPostRepository {
  addPost(data: CreatePostDto): Promise<Post>;
  getAllPosts(): Promise<Post[]>;
  getDetailPost(id: string): Promise<Post | null>;
  updatePost(id: string, data: Omit<CreatePostDto, 'authorId'>): Promise<Post>;
  deletePost(id: string): Promise<void>;
}
