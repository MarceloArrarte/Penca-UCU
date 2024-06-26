import { Router } from 'express';
import { getAllCareers, getUserProfile, getUsersRanking, loginUser, registerUser } from '../controllers/usersController';
import { authenticateJWT, authorizeAdmin } from '../middlewares/auth';

const router = Router();

router.get('/usersRanking', authenticateJWT, getUsersRanking);
router.get('/profile', authenticateJWT, getUserProfile);
router.get('/careers', getAllCareers)
router.post('/login', loginUser)
router.post('/register', registerUser)

export default router;
