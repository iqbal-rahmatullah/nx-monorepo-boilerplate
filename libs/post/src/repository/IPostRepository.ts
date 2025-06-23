import { Post } from '@prisma/client';
import { CreatePostDto } from '../dto/create_post_dto';

export interface IPostRepository {
  addPost(data: CreatePostDto): Promise<Post>;
}
