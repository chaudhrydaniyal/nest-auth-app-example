import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ref:'department'})
  department: mongoose.Schema.Types.ObjectId

  @Prop({default: false})
  is_deleted: boolean
}

export const UserSchema = SchemaFactory.createForClass(User);