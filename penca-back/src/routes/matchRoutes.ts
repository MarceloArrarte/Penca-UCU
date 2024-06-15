import { Router } from 'express';
import { getMatchesAndUserPredictions } from '../controllers/matchesController';

const router = Router();

router.get('/matchesAndUsersPredictions/:user_document', getMatchesAndUserPredictions)

export default router;
