import { Request, Response } from 'express';
import { stat } from 'fs';
import { isValidObjectId } from 'mongoose';
import { buildAttachments } from '../helpers/build-attachments';
import { dataResponseFormat } from '../helpers/data-response-format';
import { sendEmailNodemailer } from '../helpers/send-email-nodemailer';
import { Email } from '../models/email.model';

export const createEmail = async (req: Request, res: Response) => {
  const attachments: string[] = buildAttachments(req);
  const email = Email.build({
    ...req.body,
    userId: req.currentUser.id,
    attachments,
  });
  await email.save();

  res.status(201).send(email);
};

export const updateEmail = async (req: Request, res: Response) => {
  const emailId = req.params.id;

  if (!isValidObjectId(emailId)) {
    return res.status(404).send({ message: 'Not found, Invalid id provided' });
  }

  const email = await Email.findById(emailId);

  if (!email) {
    return res.status(404).send({ message: 'Not found' });
  }

  Object.assign(email, req.body);
  await email.save();

  res.send(email);
};

export const deleteEmail = async (req: Request, res: Response) => {
  const emailId = req.params.id;

  if (!isValidObjectId(emailId)) {
    return res.status(404).send({ message: 'Not found, Invalid id provided' });
  }

  const email = await Email.findByIdAndRemove(emailId);

  if (!email) {
    return res.status(404).send({ message: 'Not found' });
  }

  res.status(204).send({ message: 'Email deleted' });
};

export const getEmails = async (req: Request, res: Response) => {
  const emails = await Email.find({ userId: req.currentUser.id });
  // const emailsFormattedData = await dataResponseFormat(req, emails);
  res.send(emails);
};

export const getEmailById = async (req: Request, res: Response) => {
  const emailId = req.params.id;
  const email = await Email.findById(emailId);

  res.send(email);
};

export const sendEmail = async (req: Request, res: Response) => {
  const emailId = req.params.id;
  const email = await Email.findById(emailId);

  const result = await sendEmailNodemailer(email!);
  console.log(result);
  if (!result) {
    return res.status(400).send({
      message: result,
    });
  }

  await email?.delete();

  res.send({ message: 'Email was sent and removed from your list!' });
};
