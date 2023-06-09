import { AbstractRepository } from '@app/common';
import { Post } from '@app/common/models/schemas/post.schema';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class PostsRepository extends AbstractRepository<Post> {
  protected readonly logger = new Logger(PostsRepository.name);

  constructor(
    @InjectModel(Post.name) postModule: Model<Post>,
    @InjectConnection() connection: Connection,
  ) {
    super(postModule, connection);
  }
}
