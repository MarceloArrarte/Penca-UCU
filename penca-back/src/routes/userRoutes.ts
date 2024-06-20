import { Router } from 'express';
import { getUsersRanking, loginUser, registerUser } from '../controllers/usersController';
import { authenticateJWT, authorizeAdmin } from '../middlewares/auth';

const router = Router();

router.get('/usersRanking', authenticateJWT, authorizeAdmin, getUsersRanking);
router.post('/login', loginUser)
router.post('/register', registerUser)

export default router;
