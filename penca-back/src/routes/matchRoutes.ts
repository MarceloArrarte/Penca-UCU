import { Router } from 'express';
import { getMatchesAndUserPredictions, getMatches, updateTeamsForMatch } from '../controllers/matchesController';

const router = Router();

router.get('/matchesAndUsersPredictions/:user_document', getMatchesAndUserPredictions)
router.get('/matches', getMatches)
router.put('/matchTeams/:matchId', updateTeamsForMatch)

export default router;
