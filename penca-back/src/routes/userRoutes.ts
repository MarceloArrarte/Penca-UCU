import { Router } from 'express';
import { getUsers, loginUser, registerUser } from '../controllers/usersController';

const router = Router();

router.get('/users', getUsers);
router.post('/login', loginUser)
router.post('/register', registerUser)

export default router;
