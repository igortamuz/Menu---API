import { UserModel, ProductModel } from '../../src/models';

export const clearDb = async () => {
    await UserModel.deleteMany({});
    await ProductModel.deleteMany({});
}