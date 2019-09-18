import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import Secrets from './config/secrets';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      username: string;
      department: string;
    };
  }
}

export default (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, Secrets.jwtSecret, (err, decoded) => {
      const decodedToken = JSON.parse(JSON.stringify(decoded));
      if (err) {
        res.status(401).json({ message: 'You shall not pass!' });
      } else {
        req.user = {
          username: decodedToken.username,
          department: decodedToken.department,
        };
        next();
      }
    });
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
};
