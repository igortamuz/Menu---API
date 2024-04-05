import request from 'supertest';
import app from '../../src/app';
import httpStatus from 'http-status';
import { clearDb, returnToken } from '../factories';
import { connect } from '../../src/db/db';

describe('POST /auth/login', () => {
  beforeAll(async () => {
    await connect();
    await clearDb();
  });

  beforeEach(async () => {
    await clearDb();
  });

  it('should return all categories if authenticated', async () => {
    const token = await returnToken();
    const response = await request(app)
      .get('/category')
      .set('Authorization', `Bearer ${token.token}`)
      .expect(httpStatus.OK);

    expect(response.body).toEqual(expect.any(Array));
  });
});
