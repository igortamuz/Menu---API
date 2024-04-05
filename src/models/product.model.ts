import mongoose, { Document, Model, Schema } from 'mongoose';
import { Category } from './category.model';

export interface Product {
  id?: string;
  categories: Category[];
  name: string;
  qty: number;
  price: number;
};

export interface ProductUpdate {
  id?: string;
  categories?: Category[];
  name?: string;
  qty?: number;
  price?: number;
};

const productMongooseSchema = new mongoose.Schema<Product>({
  id: { type: String, required: false },
  categories: [{ type: mongoose.Schema.Types.Array, ref: 'Category' }],
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true }
});

export const ProductModel: Model<Product> = mongoose.model<Product>('Product', productMongooseSchema, 'products');