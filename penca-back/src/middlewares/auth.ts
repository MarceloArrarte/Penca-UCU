import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'your-secret-key';

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

interface DecodedToken {
  document: number;
  email: string;
  role: String;
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token is not valid or has expired' });
    }

    req.user = decoded as DecodedToken;

    next();
  });
};

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role == 'admin') {
    next();
  } else {
    res.sendStatus(403);
  }
};