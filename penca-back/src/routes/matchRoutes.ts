import { Router } from 'express';
import {
    getMatchesAndUserPredictions,
    getMatches,
    updateTeamsForMatch,
    updateMatchResult
} from '../controllers/matchesController';
import { authenticateJWT, authorizeAdmin } from '../middlewares/auth';

const router = Router();

router.get('/matchesAndUsersPredictions', authenticateJWT, getMatchesAndUserPredictions)
router.get('/matches', authenticateJWT, authorizeAdmin, getMatches)
router.put('/matchTeams/:matchId', authenticateJWT, authorizeAdmin, updateTeamsForMatch)
router.put('/matches/:matchId/result', authenticateJWT, authorizeAdmin, updateMatchResult)

export default router;
