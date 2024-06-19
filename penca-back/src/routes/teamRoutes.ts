import { Router } from 'express';
import { getTeams } from '../controllers/teamsController';


const router = Router();

router.get('/teams', getTeams);

export default router;
