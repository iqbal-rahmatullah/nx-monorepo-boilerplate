import { Post } from '@prisma/client';
import { CreatePostDto } from '../dto/create_post_dto';
import { IPostService } from './IPostService';
import { IPostRepository } from '../repository/IPostRepository';
import { PostRepository } from '../repository/PostRepository';
import { ServerLogger } from '@stores/shared';

export class PostService implements IPostService {
  postRepository: IPostRepository = new PostRepository();
  logger = new ServerLogger();

  async addPost(data: CreatePostDto): Promise<Post> {
    const createdPost = await this.postRepository.addPost(data);

    return createdPost;
  }
}
