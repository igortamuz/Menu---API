import mongoose, { Document, Model } from 'mongoose';

export interface Category extends Document {
  _id: string
  parent: string | null;
  name: string;
};

const categoryMongooseSchema = new mongoose.Schema<Category>({
  _id: { type: String, required: true },
  parent: { type: String, required: true },
  name: { type: String, required: true },
});

export const CategoryModel: Model<Category> = mongoose.model<Category>('Category', categoryMongooseSchema, 'categories');