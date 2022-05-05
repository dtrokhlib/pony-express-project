import { Router } from 'express';
import {
  createEmail,
  getEmails,
  updateEmail,
  getEmailById,
  deleteEmail,
  sendEmail,
} from '../controllers/email.controller';
import { authRequired } from '../middleware/auth-required';
import { permissionCheck } from '../middleware/permission-check';
import { upload } from '../middleware/uploader';
import { emailValidator } from '../validators/email.validator';

const router = Router();

router.get('/', authRequired, getEmails);
router.post('/send/:id', authRequired, permissionCheck, sendEmail);
router.post(
  '/',
  authRequired,
  upload.array('attachments'),
  emailValidator,
  createEmail
);

router.get('/:id', authRequired, permissionCheck, getEmailById);
router.patch(
  '/:id',
  authRequired,
  permissionCheck,
  emailValidator,
  updateEmail
);
router.delete('/:id', authRequired, permissionCheck, deleteEmail);

export { router as emailRouter };
