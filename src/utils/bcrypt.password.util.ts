import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const saltRoundsString = process.env.CRYPT;
if (!saltRoundsString) {
  throw new Error('CRYPT environment variable not defined');
};
const saltRounds = parseInt(saltRoundsString, 10);

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};
