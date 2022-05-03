import { Router } from 'express';
import {
  createEmail,
  getEmails,
  updateEmail,
  getEmailById,
  deleteEmail,
} from '../controllers/email.controller';
import { upload } from '../middleware/uploader';
import { emailValidator } from '../validators/email.validator';

const router = Router();

router.get('/', getEmails);
router.post('/', upload.array('attachments'), emailValidator, createEmail);

router.get('/:id', getEmailById);
router.patch('/:id', updateEmail);
router.delete('/:id', deleteEmail);

export { router as emailRouter };
