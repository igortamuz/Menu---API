import mongoose from 'mongoose';

export interface User {
  _id: string
  email: string;
  password: string;
};

export const userMongooseSchema = new mongoose.Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = mongoose.model<User>('User', userMongooseSchema, 'users');
