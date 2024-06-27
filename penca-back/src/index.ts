
import express, { Express, Request, Response , Application, NextFunction } from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import cors from 'cors'
import matchRoutes from './routes/matchRoutes';
import predictRoutes from './routes/predictionRoutes';
import teamRoutes from './routes/teamRoutes';
import fixturingRoutes from './routes/fixturingRoutes';

import morgan from 'morgan';

dotenv.config();

import './crons/upcoming-match-notification-generator';
import './crons/notification-sender';

const app: Application = express();
const port = process.env.BACKEND_PORT || 8000;

app.use(cors({
  origin: (() => {
    let origin = process.env.FRONTEND_URL;
    console.log(`Origin habilitado: ${origin}`);
    return origin;
  })()
}));

app.use(morgan('combined'));
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', matchRoutes);
app.use('/api', predictRoutes);
app.use('/api', teamRoutes);
app.use('/api', fixturingRoutes);

app.use((req, res, next) => {
  return res.status(404).json({ error: 'Not found' });
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
