import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { idTypesEnum } from '../enums/id-types.enums';

@Schema({
  versionKey: false,
  timestamps: true,
  collection: 'users',
})
export class User {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true, enum: Object.values(idTypesEnum) })
  id_type: idTypesEnum;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ id: 1 }, { unique: true });
