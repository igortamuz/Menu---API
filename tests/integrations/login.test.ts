import request from 'supertest';
import app from '../../src/app';
import { UserModel } from '../../src/models';
import httpStatus from 'http-status';
import { clearDb, returnToken } from '../factories';
import { connect } from '../../src/db/db';

describe('POST /auth/login', () => {
    beforeAll(async () => {
        await connect();
        await clearDb();
    });

    afterEach(async () => {
        await clearDb();
    });

    it('should return a JWT token if email and password are correct', async () => {
        const response = await returnToken();
        expect(response).toHaveProperty('token');
        await clearDb();
    });

    it('should return a 404 error if email is not registered', async () => {
        const email = 'test@test.com';
        const password = 'password';
        const response = await request(app)
            .post('/auth/login')
            .send({ email, password })
            .expect(httpStatus.NOT_FOUND);

        expect(response.text).toBe('Email is not registered!');
        await clearDb();
    });

    it('should return a 401 error if password is incorrect', async () => {
        const email = 'test@test.com';
        const password = 'password';
        await UserModel.create({ email, password: 'wrongPassword' });
        const response = await request(app)
            .post('/auth/login')
            .send({ email, password })
            .expect(httpStatus.UNAUTHORIZED);

        expect(response.text).toBe('Incorrect email or password!');
        await clearDb();
    });
});
