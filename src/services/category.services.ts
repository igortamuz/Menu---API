import { CategoryRepository } from '../repositories';
import { cannotGetAllCategories } from '../errors';
import { Category } from '../models';

async function getAllCategories(): Promise<Category[]> {
    const categories = await CategoryRepository.getAllCategories();
    if (!categories) {
        throw cannotGetAllCategories();
    };
    
    return categories;
};

export const CategoryService = {
    getAllCategories
};