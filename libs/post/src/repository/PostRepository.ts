import { Post } from '@prisma/client';
import { CreatePostDto } from '../dto/create_post_dto';
import { IPostRepository } from './IPostRepository';
import { postPrisma } from '@stores/shared';

export class PostRepository implements IPostRepository {
  async addPost(data: CreatePostDto): Promise<Post> {
    return await postPrisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        authorId: data.authorId,
      },
    });
  }
}
