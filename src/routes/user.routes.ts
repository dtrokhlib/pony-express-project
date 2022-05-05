import { Router } from 'express';
import {
  getUserById,
  getUsers,
  userAuthorized,
  userLogin,
  userRegister,
} from '../controllers/user.controller';
import { authRequired } from '../middleware/auth-required';
import { userValidator } from '../validators/user.validator';

const router = Router();

router.get('/api/auth-verify/', authRequired, userAuthorized);
router.post('/register', userValidator, userRegister);
router.post('/login', userValidator, userLogin);
router.get('/:id', getUserById);
router.get('/', getUsers);

export { router as userRouter };
