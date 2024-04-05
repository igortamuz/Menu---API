import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function createJwtToken(userId: string) {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        return token;
    } catch (err) {
        throw new Error(`Invalid token: ${err}`);
    };
};


