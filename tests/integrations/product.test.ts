import request from 'supertest';
import app from '../../src/app';
import { ProductModel } from '../../src/models';
import { productNameIsAlReadyRegistered } from '../../src/errors';
import httpStatus from 'http-status';
import { clearDb, productData, productDataInvalid, returnToken } from '../factories';
import { connect } from '../../src/db/db';

describe('POST /product', () => {
    beforeAll(async () => {
        await connect();
    });

    beforeEach(async () => {
        await clearDb();
    });

    it('should create a new product', async () => {
        const data = productData;
        const token = await returnToken();

        const response = await request(app)
            .post('/product')
            .set('Authorization', `Bearer ${token.token}`)
            .send(data);

        expect(response.status).toBe(httpStatus.CREATED);
        expect(response.body.name).toBe(data.name);
        expect(response.body.qty).toBe(data.qty);
        expect(response.body.price).toBe(data.price);
    });

    it('should return 409 when trying to create a product with a name that already exists', async () => {
        const data = productData;
        const token = await returnToken();

        await ProductModel.create(data);

        const response = await request(app)
            .post('/product')
            .set('Authorization', `Bearer ${token.token}`)
            .send(data);

        expect(response.status).toBe(httpStatus.CONFLICT);
        expect(response.text).toBe(productNameIsAlReadyRegistered().message);
    });

    it('should return 404 when trying to create a product with an invalid category', async () => {
        const data = productDataInvalid;
        const token = await returnToken();

        const response = await request(app)
            .post('/product')
            .set('Authorization', `Bearer ${token.token}`)
            .send(data);

        expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
});

describe('GET /product', () => {
    beforeAll(async () => {
        await connect();
    });

    beforeEach(async () => {
        await clearDb();
    });

    it('responds with JSON array of products', async () => {
        const data = productData;
        const token = await returnToken();

        const addProduct = await request(app)
            .post('/product')
            .set('Authorization', `Bearer ${token.token}`)
            .send(data);

        const response = await request(app)
            .get('/product')
            .set('Authorization', `Bearer ${token.token}`)
            .expect('Content-Type', /json/)
            .expect(httpStatus.OK);

        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });


});

describe('GET /product/:id', () => {
    beforeAll(async () => {
        await connect();
    });

    beforeEach(async () => {
        await clearDb();
    });

    it('returns a product with a valid ID', async () => {
        const data = productData;
        const token = await returnToken();

        const product = await request(app)
            .post('/product')
            .set('Authorization', `Bearer ${token.token}`)
            .send(data);

        const response = await request(app)
            .get(`/product/${product.body._id}`)
            .set('Authorization', `Bearer ${token.token}`)
            .expect('Content-Type', /json/)
            .expect(httpStatus.OK);

        expect(httpStatus.OK).toBe(httpStatus.OK);
    });

    it('returns a 404 error for a nonexistent ID', async () => {
        const nonexistentId = '123456789';
        const token = await returnToken();

        const response = await request(app)
            .get(`/product/${nonexistentId}`)
            .set('Authorization', `Bearer ${token.token}`)
            .expect(httpStatus.NOT_FOUND);

        expect(response.body).toHaveProperty('error', `Invalid product ID: ${nonexistentId}`);
    });

    it('returns a 404 error for an invalid ID', async () => {
        const invalidId = 'not-an-object-id';
        const token = await returnToken()
        const response = await request(app)
            .get(`/product/${invalidId}`)
            .set('Authorization', `Bearer ${token.token}`)
            .expect(httpStatus.NOT_FOUND);

        expect(response.body).toHaveProperty('error', `Invalid product ID: ${invalidId}`);
    });
});

describe('DELETE /product/:id', () => {

    beforeAll(async () => {
        await connect();
    });

    beforeEach(async () => {
        await clearDb();
    });

    it('should return 400 if product ID is not valid', async () => {
        const invalidId = 'not-an-object-id';
        const token = await returnToken()
        const response = await request(app)
            .get(`/product/${invalidId}`)
            .set('Authorization', `Bearer ${token.token}`)
            .expect(httpStatus.NOT_FOUND);

        expect(response.body).toHaveProperty('error', `Invalid product ID: ${invalidId}`);
    });

    it('should return 404 if product is not found', async () => {
        const nonexistentId = '123456789';
        const token = await returnToken();

        const response = await request(app)
            .get(`/product/${nonexistentId}`)
            .set('Authorization', `Bearer ${token.token}`)
            .expect(httpStatus.NOT_FOUND);

        expect(response.body).toHaveProperty('error', `Invalid product ID: ${nonexistentId}`);
    });

    it('should delete product and return 200', async () => {
        const data = productData
        const token = await returnToken()

        const product = await request(app)
            .post('/product')
            .set('Authorization', `Bearer ${token.token}`)
            .send(data);

        const response = await request(app)
            .delete(`/product/${product.body._id}`)
            .set('Authorization', `Bearer ${token.token}`)
            .expect(httpStatus.OK);

        expect(response.body.deletedCount).toBe(`Product with id ${product.body._id} has been deleted`);

        const deletedProduct = await ProductModel.findById(product.body._id);
        expect(deletedProduct).toBeNull();
    });
});

describe('PATCH /product/:id', () => {

    beforeAll(async () => {
        await connect();
    });

    beforeEach(async () => {
        await clearDb();
    });

    it('should update product', async () => {
        const existingProduct = productData;
        const updatedProduct = { name: 'Updated Test Product', qty: 20, price: 200 };
        const token = await returnToken()

        const createResponse = await request(app)
            .post('/product')
            .set('Authorization', `Bearer ${token.token}`)
            .send(existingProduct)
            .expect(httpStatus.CREATED);

        const productId = createResponse.body._id;

        const updateResponse = await request(app)
            .patch(`/product/${productId}`)
            .set('Authorization', `Bearer ${token.token}`)
            .send(updatedProduct)
            .expect(httpStatus.OK);

        expect(updateResponse.body).toMatchObject({
            _id: productId,
            name: updatedProduct.name,
            qty: updatedProduct.qty,
            price: updatedProduct.price,
        });
    });

    it('should return 404 if product id is invalid', async () => {
        const token = await returnToken()
        await request(app)
            .patch('/product/invalid-id')
            .set('Authorization', `Bearer ${token.token}`)
            .send({ name: 'Updated Product' })
            .expect(httpStatus.NOT_FOUND);
    });

    it('should return 404 if product is not found', async () => {
        const nonexistentId = '123456789';
        const token = await returnToken();

        const response = await request(app)
            .get(`/product/${nonexistentId}`)
            .set('Authorization', `Bearer ${token.token}`)
            .send({ name: 'Updated Product' })
            .expect(httpStatus.NOT_FOUND);

        expect(response.body).toHaveProperty('error', `Invalid product ID: ${nonexistentId}`);
    });

});