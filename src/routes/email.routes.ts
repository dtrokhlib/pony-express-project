import { Router } from 'express';
import {
  createEmail,
  getEmails,
  updateEmail,
  getEmailById,
  deleteEmail,
} from '../controllers/email.controller';
import { authRequired } from '../middleware/auth-required';
import { upload } from '../middleware/uploader';
import { emailValidator } from '../validators/email.validator';

const router = Router();

router.get('/', authRequired, getEmails);
router.post(
  '/',
  authRequired,
  upload.array('attachments'),
  emailValidator,
  createEmail
);

router.get('/:id', authRequired, getEmailById);
router.patch('/:id', authRequired, updateEmail);
router.delete('/:id', authRequired, deleteEmail);

export { router as emailRouter };
