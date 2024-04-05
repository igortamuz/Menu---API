import { Request, Response } from 'express';
import { ProductService } from '../services';
import httpStatus from 'http-status';
import mongoose from 'mongoose';

async function createProduct(req: Request, res: Response) {
  try {
    const newProduct = await ProductService.createProduct(req.body);
    res.status(httpStatus.CREATED).json(newProduct);
  } catch (error: any) {
    if (error.name === 'productNameIsAlReadyRegistered') {
      return res.status(httpStatus.CONFLICT).send(error.message);
    };
    if (error.name === 'CategoryIdDoesNotExist') {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    };
    if (error.name === 'invalidCategory' || error.name === 'categoryParentDoesNotExistInThisID' || error.name === 'categoryNameDoesNotExist' || error.name === 'categoryNameDoesNotExistInThisID') {
      return res.status(httpStatus.BAD_REQUEST).send(error.message);
    };
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

async function getAllProducts(req: Request, res: Response) {
  try {
    const result = await ProductService.getAllProducts();
    res.status(httpStatus.OK).json(result);
  } catch (error) {
    if (error.name === 'cannotGetAllProducts') {
      return res.status(httpStatus.NOT_FOUND).send(error.message)
    };
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Could not get all products: ${error}` });
  };
};

async function getProductById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(httpStatus.NOT_FOUND).json({ error: `Invalid product ID: ${id}` });
    }
    const product = await ProductService.getProductById(id);
    return res.status(httpStatus.OK).json(product);
  } catch (error) {
    if (error.name === 'productIdNotFound') {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    };
    if (error.name === 'invalidProductId' || error.name === 'invalidId') {
      return res.status(httpStatus.BAD_REQUEST).send(error.message);
    };
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
  };
};

async function updateProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(httpStatus.NOT_FOUND).json({ error: `Invalid product ID: ${id}` });
    }
    const updatedProduct = req.body;
    const updatedProductDoc = await ProductService.updateProduct(id, updatedProduct);
    if (!updatedProductDoc) {
      return res.status(httpStatus.NOT_FOUND).json({ error: `Product not found with ID: ${id}` });
    }
    res.json(updatedProductDoc);
  } catch (error) {
    if (error.name === 'productIdNotFound' || error.name === 'CategoryIdDoesNotExist') {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    };
    if (error.name === 'pricesCannotBeNegative' || error.name === 'quantityCannotBeNegative' || error.name === 'categoryParentDoesNotExistInThisID' || error.name === 'categoryNameDoesNotExist' || error.name === 'categoryNameDoesNotExistInThisID') {
      return res.status(httpStatus.BAD_REQUEST).send(error.message);
    };
    if (error.name === 'productNameIsAlReadyRegistered') {
      return res.status(httpStatus.CONFLICT).send(error.message);
    };
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  };
};

async function deleteProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(httpStatus.NOT_FOUND).json({ error: `Invalid product ID: ${id}` });
    }
    const deletedCount = await ProductService.deleteProductById(id);
    res.status(httpStatus.OK).json({ deletedCount });
  } catch (error) {
    if (error.name === 'invalidProductId' || error.name === 'invalidId') {
      return res.status(httpStatus.BAD_REQUEST).send(error.message);
    };
    if (error.name === 'productIdNotFound') {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
    };

    res.status(500).json({ message: `Internal server error` });
  };
};

export const ProductController = {
  createProduct, getAllProducts, getProductById, updateProduct, deleteProduct
};
