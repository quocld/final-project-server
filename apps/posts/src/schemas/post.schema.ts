import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';
import { Schema as MongooseShema } from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true, collection: 'posts' })
export class Post extends AbstractDocument {
  @Prop({ type: String, required: true })
  user_id: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({
    required: false,
    type: { isDeleted: Boolean, user_id: MongooseShema.Types.ObjectId },
    ref: 'user',
  })
  likes: { unliked: boolean; user_id: User }[];

  @Prop([
    {
      type: MongooseShema.Types.ObjectId,
      ref: 'Comment',
      required: false,
    },
  ])
  comments: Comment[];

  @Prop([
    {
      type: {
        type: String,
        enum: ['image', 'video'],
      },
      url: String,
      key: String,
    },
    { required: false },
  ])
  media: {
    type: string;
    url: string;
    key: string;
  }[];

  @Prop({
    type: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    required: false,
  })
  location: {
    latitude: number;
    longitude: number;
  };
}

export const PostSchema = SchemaFactory.createForClass(Post);
