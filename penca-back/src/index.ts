
import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app: Application = express();
const port = process.env.BACKEND_PORT || 8000;

app.use(express.json());

app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
