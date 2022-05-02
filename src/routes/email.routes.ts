import bodyParser from 'body-parser';
import { Router } from 'express';
import {
  createEmail,
  getEmails,
  updateEmail,
  getEmailById,
  deleteEmail,
} from '../controllers/email.controller';
import { upload } from '../middleware/uploader';

const router = Router();
const jsonBodyParser = bodyParser.json();
const urlBodyParser = bodyParser.urlencoded({ extended: true})


router
  .route('/')
  .get(getEmails)
  .post(urlBodyParser, jsonBodyParser, upload.array('attachments'), createEmail);

router
  .route('/:id')
  .get(getEmailById)
  .patch(urlBodyParser, jsonBodyParser, updateEmail)
  .delete(deleteEmail);

export { router as emailRouter };
