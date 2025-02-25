import { model, Schema } from 'mongoose';
import { IUser } from '../types';

// User Schema
const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = model<IUser>('User', UserSchema);

export default User;
