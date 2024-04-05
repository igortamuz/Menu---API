import { User, UserModel } from '../models';
import { createJwtToken } from '../jwt';
import { UserRepository } from '../repositories';
import { userSchema } from '../schemas';
import { emailIsAlReadyRegistered, emailIsNotRegistered } from '../errors';

async function createUserService(email: string, password: string): Promise<User> {
    const { error } = userSchema.validate({ email, password });
    if (error) {
        throw new Error(error.message);
    };

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        throw emailIsAlReadyRegistered();
    };

    const newUser = await UserRepository.createUserRepository(email, password);
    return newUser;
};

async function createLoginService(email: string, password: string): Promise<String> {
    const { error } = userSchema.validate({ email, password });
    if (error) {
        throw new Error(error.message);
    };

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
        throw emailIsNotRegistered();
    }

    const newUser = await UserRepository.loginUserRepository(email, password);
    const token = createJwtToken(newUser._id.toString());
    return token;
};

export const UserService = {
    createUserService,
    createLoginService
};