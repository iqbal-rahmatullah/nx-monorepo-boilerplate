import { Post } from '@prisma/client';
import { CreatePostDto } from '../dto/create_post_dto';
import { AuthRequest } from '@stores/shared';

export interface IPostService {
  addPost(data: CreatePostDto): Promise<Post>;
  getAllPosts(): Promise<Post[]>;
  getDetailPost(id: string): Promise<Post | null>;
  updatePost(
    id: string,
    data: Omit<CreatePostDto, 'authorId'>,
    req: AuthRequest
  ): Promise<Post>;
  deletedPost(id: string, req: AuthRequest): Promise<void>;
}
