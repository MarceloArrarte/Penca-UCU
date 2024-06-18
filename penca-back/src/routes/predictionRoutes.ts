import { Router } from 'express';
import { predictMatchResults } from '../controllers/predictionsController';

const router = Router();

router.put('/predictMatchResults/:matchId', predictMatchResults)

export default router;
