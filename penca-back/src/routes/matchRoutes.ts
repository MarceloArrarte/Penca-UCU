import { Router } from 'express';
import { getMatchesAndUserPredictions, getMatches } from '../controllers/matchesController';

const router = Router();

router.get('/matchesAndUsersPredictions/:user_document', getMatchesAndUserPredictions)
router.get('/matches', getMatches)

export default router;
