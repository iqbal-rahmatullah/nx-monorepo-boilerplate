import { Post } from '@prisma/client';
import { CreatePostDto } from '../dto/create_post_dto';
import { IPostRepository } from './IPostRepository';
import { postPrisma } from '@stores/shared';

export class PostRepository implements IPostRepository {
  async deletePost(id: string): Promise<void> {
    await postPrisma.post.delete({ where: { id } });
  }

  async updatePost(
    id: string,
    data: Omit<CreatePostDto, 'authorId'>
  ): Promise<Post> {
    return await postPrisma.post.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content,
      },
    });
  }

  async getDetailPost(id: string): Promise<Post | null> {
    return await postPrisma.post.findFirst({
      where: { id },
    });
  }

  async getAllPosts(): Promise<Post[]> {
    return await postPrisma.post.findMany();
  }

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
