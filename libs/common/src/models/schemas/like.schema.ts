import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseShema, now } from 'mongoose';

export type LikeDocument = HydratedDocument<Like>;

@Schema({ timestamps: true, collection: 'likes' })
export class Like extends AbstractDocument {
  @Prop({ type: MongooseShema.Types.ObjectId, ref: 'User', required: true })
  author_id: string;

  @Prop({ type: String, required: true })
  post_id: string;

  @Prop({ type: Boolean, default: false })
  unliked: boolean;

  @Prop({ type: Date, default: now })
  createdAt: Date;

  @Prop({ type: Date, default: now })
  updatedAt: Date;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
