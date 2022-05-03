import { Request, Response } from 'express';
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
    // Error handler needs to be implemented since with async function
    // default middleware for error handling cannot catch the error
    // throw new NotFound('Email not found');
  }

  res.send(email);
};

export const createEmail = (req: Request, res: Response) => {
  let attachments: any[] = [];
  if (req.files && Array.isArray(req.files)) {
    attachments = req.files.map((file) => `/uploads/${file.filename}`);
  }

  const email = Email.build({ ...req.body, userId: '3123133', attachments})
 
  res.status(201).send({ status: 'OK' });
};

export const updateEmail = async (req: Request, res: Response) => {
  const emailId = req.params.id;

  const email = await Email.findById(emailId);

  if (!email) {
    return res.status(404).send('Not found');
    // Error handler needs to be implemented since with async function
    // default middleware for error handling cannot catch the error
    // throw new NotFound('Email not found');
  }

  Object.assign(email, req.body);

  res.send(email);
};

export const deleteEmail = async (req: Request, res: Response) => {
  const emailId = req.params.id;

  const email = await Email.findByIdAndRemove(emailId);

  if (!email) {
    return res.status(404).send('Not found');
    // Error handler needs to be implemented since with async function
    // default middleware for error handling cannot catch the error
    // throw new NotFound('Email not found');
  }

  res.sendStatus(204);
};
