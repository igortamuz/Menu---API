import express from 'express';
import { CategoryController } from '../controllers';
import { authenticateToken } from '../middlewares';

const categoryRouter = express.Router();

categoryRouter.use(authenticateToken);

categoryRouter
    .get('/', CategoryController.getAllCategories);

export { categoryRouter };

