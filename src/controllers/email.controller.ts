import { Request, Response } from 'express';
import { buildAttachments } from '../helpers/build-attachments';
import { dataResponseFormat } from '../helpers/data-response-format';
import { Email } from '../models/email.model';

export const getEmails = async (req: Request, res: Response) => {
  const emails = await Email.find();
  const emailsFormattedData = await dataResponseFormat(req, emails);
  res.send(emailsFormattedData);
};

export const getEmailById = async (req: Request, res: Response) => {
  const emailId = req.params.id;
  const email = await Email.findById(emailId);

  if (!email) {
    return res.status(404).send('Not found');
  }

  res.send(email);
};

export const createEmail = async (req: Request, res: Response) => {
  const attachments: string[] = buildAttachments(req);
  const email = Email.build({ ...req.body, userId: '3123133', attachments });
  await email.save();

  res.status(201).send({ status: 'OK' });
};

export const updateEmail = async (req: Request, res: Response) => {
  const emailId = req.params.id;
  const email = await Email.findById(emailId);

  if (!email) {
    return res.status(404).send('Not found');
  }

  Object.assign(email, req.body);
  await email.save();

  res.send(email);
};

export const deleteEmail = async (req: Request, res: Response) => {
  const emailId = req.params.id;
  const email = await Email.findByIdAndRemove(emailId);

  if (!email) {
    return res.status(404).send('Not found');
  }

  res.sendStatus(204);
};
