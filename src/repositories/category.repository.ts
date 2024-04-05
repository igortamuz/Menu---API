import { CategoryModel, Category } from '../models';

async function getAllCategories(): Promise<Category[]> {
  const categories = await CategoryModel.find({});
  return categories;
};

export const CategoryRepository = {
  getAllCategories
};

