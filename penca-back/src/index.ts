
import express, { Express, Request, Response , Application, NextFunction } from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import cors from 'cors'
import matchRoutes from './routes/matchRoutes';
import predictRoutes from './routes/predictionRoutes';
import teamRoutes from './routes/teamRoutes';
import morgan from 'morgan';
import jwt, { JwtPayload } from 'jsonwebtoken';

dotenv.config();
const secretJwtKey = process.env.JWT_SECRET || 'your_default_secret_key'

const app: Application = express();
const port = process.env.BACKEND_PORT || 8000;

app.use(cors({
  origin: (() => {
    let origin = `http://localhost:${process.env.FRONTEND_PORT}`;
    console.log(`Origin habilitado: ${origin}`);
    return origin;
  })()
}));

app.use(morgan('combined'));
app.use(express.json());

app.use(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader && /Bearer [^ ]+/.test(authHeader)) {
    const token = authHeader.split('Bearer ')[1];

    res.locals.auth = await new Promise((resolve, reject) => {
      jwt.verify(token, secretJwtKey, (err, decoded) => {
        if (!err) {
          resolve(decoded);
        }
        else {
          resolve(undefined)
        }
      });
    });
  }
  
  next();
});

app.use('/api', userRoutes);
app.use('/api', matchRoutes);
app.use('/api', predictRoutes);
app.use('/api', teamRoutes);

app.use((req, res, next) => {
  return res.status(404).json({ error: 'Not found' });
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
