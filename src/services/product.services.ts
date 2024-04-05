import { Product, ProductModel, ProductUpdate, CategoryModel, Category } from '../models';
import { productSchema, productSchemaUpdate } from '../schemas';
import { ProductRepository } from '../repositories';
import { productNameIsAlReadyRegistered, categoryIdDoesNotExist, cannotGetAllProducts, productIdNotFound, pricesCannotBeNegative, quantityCannotBeNegative, categoryNameDoesNotExist, categoryNameDoesNotExistInThisID, categoryParentDoesNotExistInThisID } from '../errors';

async function createProduct(productData: Product): Promise<Product> {
    const body = {
        categories: productData.categories,
        name: productData.name,
        qty: productData.qty,
        price: productData.price
    };

    const { error } = productSchema.validate(body);
    if (error) {
        throw new Error(error.message);
    };

    const { name } = productData;
    const existingProduct = await ProductModel.findOne({ name });
    if (existingProduct) {
        throw productNameIsAlReadyRegistered();
    };

    // Verificar se existe uma ou mais categorias no produto
    if (productData.categories && productData.categories.length > 0) {
        // Mapeia as categorias selecionadas 
        const categories = await Promise.all(productData.categories.map(async (categoryId) => {
            const foundCategory = await CategoryModel.findOne({ _id: categoryId });
            //Se uma não for encontrada, retorna erro 
            if (!foundCategory) {
                const id = categoryId._id;
                throw categoryIdDoesNotExist(id);
            };
            return foundCategory.toObject() as Category;
        }));
        // Substitui a lista de ids de categorias pela lista de objetos de categoria correspondentes
        productData.categories = categories;
    };

    //Analisar se name de categories está correto de acordo com o id!
    if (productData.categories && productData.categories.length > 0) {
        const categories = await Promise.all(productData.categories.map(async (category) => {
            const foundCategory = await CategoryModel.findOne({ name: category.name, _id: category._id });

            if (!foundCategory) {
                throw categoryNameDoesNotExist();
            }

            if (foundCategory.name !== body.categories?.[0]?.name) {
                throw categoryNameDoesNotExistInThisID();
            }

            return foundCategory.toObject() as Category;
        }));
        productData.categories = categories;
    };

    //Analisar se parent de categories está correto de acordo com o id!
    if (productData.categories && productData.categories.length > 0) {
        const categories = await Promise.all(productData.categories.map(async (category) => {
            const categoryId = category._id;
            const categoryParent = category.parent;
            let foundCategory;

            if (categoryParent !== null) {
                foundCategory = await CategoryModel.findOne({ _id: categoryParent });
                if (!foundCategory) {
                    throw categoryParentDoesNotExistInThisID();
                }
            }
            foundCategory = await CategoryModel.findOne({ _id: categoryId });

            if (!foundCategory) {
                throw categoryIdDoesNotExist(categoryId);
            }

            if (categoryParent !== body.categories?.[0]?.parent) {
                throw categoryParentDoesNotExistInThisID();
            }

            return foundCategory.toObject() as Category;
        }));
        productData.categories = categories;
    };


    const newProduct = await ProductRepository.createProduct(productData);
    return newProduct;
};

async function getAllProducts(): Promise<Product[]> {
    const products = await ProductRepository.getAllProducts();
    if (!products) {
        throw cannotGetAllProducts();
    };

    return products;
};

async function getProductById(id: string): Promise<Product> {
    const product = await ProductRepository.getProductById(id);
    if (!product) {
        throw productIdNotFound(id);
    }
    return product;
};

async function updateProduct(id: string, updatedProduct: ProductUpdate): Promise<ProductUpdate> {
    //Remove o userId
    const body = {
        categories: updatedProduct.categories,
        name: updatedProduct.name,
        qty: updatedProduct.qty,
        price: updatedProduct.price
    };

    const { error } = productSchemaUpdate.validate(body);
    if (error) {
        throw new Error(error.message);
    }

    const existingProduct = await getProductById(id);
    if (!existingProduct) {
        throw productIdNotFound(id);
    }

    if ((updatedProduct.price ?? existingProduct.price) < 0) {
        throw pricesCannotBeNegative();
    }

    if ((updatedProduct.qty ?? existingProduct.qty) < 0) {
        throw quantityCannotBeNegative();
    }

    const { name } = updatedProduct;
    const existingProductName = await ProductModel.findOne({ name });

    if (existingProductName && existingProductName._id.toString() !== id) {
        throw productNameIsAlReadyRegistered();
    };

    //Analisar se Id de categories está correto!
    if (updatedProduct.categories && updatedProduct.categories.length > 0) {
        const categories = await Promise.all(updatedProduct.categories.map(async (categoryId) => {
            const foundCategory = await CategoryModel.findOne({ _id: categoryId });

            if (!foundCategory) {
                const id = categoryId._id;
                throw categoryIdDoesNotExist(id);
            };

            return foundCategory.toObject() as Category;
        }));
        updatedProduct.categories = categories;
    };

    //Analisar se name de categories está correto de acordo com o id!
    if (updatedProduct.categories && updatedProduct.categories.length > 0) {
        const categories = await Promise.all(updatedProduct.categories.map(async (category) => {
            const foundCategory = await CategoryModel.findOne({ name: category.name, _id: category._id });

            if (!foundCategory) {
                throw categoryNameDoesNotExist();
            }

            if (foundCategory.name !== body.categories?.[0]?.name) {
                throw categoryNameDoesNotExistInThisID();
            }

            return foundCategory.toObject() as Category;
        }));
        updatedProduct.categories = categories;
    };

    //Analisar se parent de categories está correto de acordo com o id!
    if (updatedProduct.categories && updatedProduct.categories.length > 0) {
        const categories = await Promise.all(updatedProduct.categories.map(async (category) => {
            const categoryId = category._id;
            const categoryParent = category.parent;
            let foundCategory;

            if (categoryParent !== null) {
                foundCategory = await CategoryModel.findOne({ _id: categoryParent });
                if (!foundCategory) {
                    throw categoryParentDoesNotExistInThisID();
                }
            }
            foundCategory = await CategoryModel.findOne({ _id: categoryId });

            if (!foundCategory) {
                throw categoryIdDoesNotExist(categoryId);
            }

            if (categoryParent !== body.categories?.[0]?.parent) {
                throw categoryParentDoesNotExistInThisID();
            }

            return foundCategory.toObject() as Category;
        }));
        updatedProduct.categories = categories;
    };


    // Atualiza com as informações atualizadas, combinando as informações com as novas informações do "updatedProduct"
    const updatedProductDoc = await ProductRepository.updateProductById(id, {
        ...existingProduct,
        ...body,
        categories: body.categories ?? existingProduct.categories
    });
    return updatedProductDoc;
};

async function deleteProductById(id: string): Promise<String> {
    const products = await ProductRepository.getProductById(id);
    if (!products) {
        throw productIdNotFound(id);
    };

    const deleteProduct = ProductRepository.deleteProductById(id);
    return deleteProduct;
};

export const ProductService = {
    createProduct, getAllProducts, getProductById, updateProduct, deleteProductById
};
