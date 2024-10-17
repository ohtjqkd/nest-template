import { getModelForClass, prop, Ref } from '@typegoose/typegoose';

import { Asset } from './asset.model';
import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

// export class User {
//   @prop()
//   public _id: string;
//
//   @prop()
//   public name?: string;
//
//   @prop({ ref: () => Asset })
//   public asset?: Ref<Asset>;
//
//   public of(): UserDto {
//     return {
//       id: this._id,
//       name: this.name,
//     };
//   }
// }

// export const UserModel = getModelForClass(User);

import { Prop, Schema, SchemaOptions, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
  id: false,
};
@Schema(options)
export class User extends Document {
  @Prop()
  name: string;
}
export const UserSchema = SchemaFactory.createForClass(User);

const UserZod = z.object({
  id: z.string().optional(),
  name: z.string(),
});

export class UserDto extends createZodDto(UserZod) {}
