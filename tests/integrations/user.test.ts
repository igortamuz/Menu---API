import app from '../../src/app';
import { UserModel } from '../../src/models';
import request from 'supertest';
import httpStatus from 'http-status';
import { connect } from '../../src/db/db';
import { clearDb } from '../factories';

describe('POST /signUp', () => {
    beforeAll(async () => {
        await connect();
        await clearDb();
    });

    afterEach(async () => {
        await clearDb();
    });

    it('should create a new user', async () => {
        const email = 'test@test.com';
        const password = 'password';
      
        const response = await request(app)
            .post('/signUp')
            .send({ email, password })
            .expect(httpStatus.CREATED);
        
        expect(response.body.user.email).toBe(email);
    });

    it('should return a 400 error if email is missing', async () => {
        const password = 'password';

        const response = await request(app)
            .post('/signUp')
            .send({ password })
            .expect(httpStatus.BAD_REQUEST);

        expect(response.body.message).toBe('"\email\" is required');
    });

    it('should return a 400 error if password is missing', async () => {
        const email = 'test@test.com';

        const response = await request(app)
            .post('/signUp')
            .send({ email })
            .expect(httpStatus.BAD_REQUEST);

        expect(response.body.message).toBe('"\password\" is required');
    });

    it('should return a 400 error if email is invalid', async () => {
        const email = 'invalid-email';
        const password = 'password';

        const response = await request(app)
            .post('/signUp')
            .send({ email, password })
            .expect(httpStatus.BAD_REQUEST);

        expect(response.body.message).toBe('"\email\" must be a valid email');
    });

    it('should return a 409 error if email is already registered', async () => {
        const email = 'test@test.com';
        const password = 'password';

        await UserModel.create({ email, password });

        const response = await request(app)
            .post('/signUp')
            .send({ email, password })
            .expect(httpStatus.CONFLICT);

        expect(response.text).toBe('Email is already registered!');
    });
});
