import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
 
dotenv.config();
const SECRET = process.env.JWT_SECRET ?? 'default_secret';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    //recive
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Missing auth token' });
    }

    try {
        //Fazer decode
        const decodedToken = jwt.verify(token, SECRET) as { userId: number };
        const userId = decodedToken.userId;
        req.body.userId = userId;
        //auth
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid auth token' });
    };
};

export default authenticateToken;
