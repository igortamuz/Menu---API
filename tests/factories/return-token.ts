import request from 'supertest';
import server from '../../src/app';
import { UserModel } from '../../src/models';
import httpStatus from 'http-status';
import { emailPasword } from '../factories';

export const returnToken = async () => {
    const body = await emailPasword();
    const email = body.email;
    const password = body.password;
 
    await UserModel.findOne({ email });

    const response = await request(server)
        .post('/auth/login')
        .send({ email, password })
        .expect(httpStatus.CREATED);
    
    return response.body
}
