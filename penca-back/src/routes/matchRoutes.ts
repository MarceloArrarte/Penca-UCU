import { Router } from 'express';
import { getMatchesAndUserPredictions, getMatches, updateTeamsForMatch } from '../controllers/matchesController';
import { authenticateJWT, authorizeAdmin } from '../middlewares/auth';

const router = Router();

router.get('/matchesAndUsersPredictions/:user_document', authenticateJWT, getMatchesAndUserPredictions)
router.get('/matches', authenticateJWT, authorizeAdmin, getMatches)
router.put('/matchTeams/:matchId', authenticateJWT, authorizeAdmin, updateTeamsForMatch)

export default router;
