import { Router } from 'express';
import {
    getMatchesAndUserPredictions,
    getMatches,
    updateTeamsForMatch,
    updateMatchResult,
    getMatchesToBeDetermined
} from '../controllers/matchesController';
import { authenticateJWT, authorizeAdmin } from '../middlewares/auth';

const router = Router();

router.get('/matchesAndUsersPredictions', authenticateJWT, getMatchesAndUserPredictions)
router.get('/matches', authenticateJWT, authorizeAdmin, getMatches)
router.get('/matches/toBeDetermined', authenticateJWT, authorizeAdmin, getMatchesToBeDetermined)
router.put('/matchTeams/:matchId', authenticateJWT, authorizeAdmin, updateTeamsForMatch)
router.put('/matches/:matchId/result', authenticateJWT, authorizeAdmin, updateMatchResult)

export default router;
