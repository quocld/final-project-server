import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-new-post.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private postRepository: PostsRepository) {}

  getAll() {
    return this.postRepository.find({});
  }

  async createPost(data: any) {
    return this.postRepository.create({
      ...data,
      user_id: data.user_id,
      isDeleted: false,
    });
  }
}
