import { Router } from 'express';
import { predictMatchResults } from '../controllers/predictionsController';
import { authenticateJWT } from '../middlewares/auth';

const router = Router();

router.put('/predictMatchResults/:matchId', authenticateJWT, predictMatchResults)

export default router;
