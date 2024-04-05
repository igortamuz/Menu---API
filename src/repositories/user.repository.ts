import { hashPassword, comparePassword } from '../utils/bcrypt.password.util';
import { User, UserModel } from '../models';
import { incorrectEmailOrPassword } from '../errors';

async function createUserRepository(email: string, password: string): Promise<User>  {
  const hashedPassword = await hashPassword(password);
  const userWithHashedPassword = {
    email: email,
    password: hashedPassword,
  };
  return UserModel.create(userWithHashedPassword);
};

async function loginUserRepository(email: string, password: string): Promise<User>  {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw incorrectEmailOrPassword();
  };

  const passwordMatch = await comparePassword(password, user.password);
  if (!passwordMatch) {
    throw incorrectEmailOrPassword();
  };
  return user;
};

export const UserRepository = {
  createUserRepository, loginUserRepository
};
