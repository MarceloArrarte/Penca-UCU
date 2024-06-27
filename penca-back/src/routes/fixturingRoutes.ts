import { Router } from 'express';
import { getGroupsFixturing } from '../controllers/fixturingController';
import { authenticateJWT } from '../middlewares/auth';

const router = Router();

router.get('/fixturing', authenticateJWT, getGroupsFixturing)

export default router;
