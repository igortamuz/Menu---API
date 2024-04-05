import { Request, Response } from 'express';
import { CategoryService } from '../services';
import httpStatus from 'http-status';

async function getAllCategories(req: Request, res: Response) {
  try {
    const result = await CategoryService.getAllCategories();
    res.status(httpStatus.OK).json(result);
  } catch (error) {
    if (error.name === 'cannotGetAllCategories') {
      return res.status(httpStatus.NOT_FOUND).send(error.message)
    };
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  };
};


export const CategoryController = {
  getAllCategories,
};
