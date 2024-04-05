
import { UserModel } from '../../src/models';
import { hashPassword } from '../../src/utils/bcrypt.password.util';

export const emailPasword = async () => {
    const email = 'test@test.com';
    const password = '123123';
    const hashedPassword = await hashPassword(password);
    const userWithHashedPassword = {
        email: email,
        password: hashedPassword,
    };

    await UserModel.create(userWithHashedPassword);
    const body = {
        email: 'test@test.com',
        password: '123123'
    }

    return body
}
