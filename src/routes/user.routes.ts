import { Router } from 'express';
import {
  getUserById,
  getUsers,
  userLogin,
  userRegister,
} from '../controllers/user.controller';
import { userValidator } from '../validators/user.validator';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/register', userValidator, userRegister);
router.post('/login', userValidator, userLogin);

export { router as userRouter };
