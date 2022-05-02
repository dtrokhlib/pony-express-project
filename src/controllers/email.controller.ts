import { Request, Response } from 'express';
import { NotFound } from '../errors/error-not-found';
import { dataResponseFormat } from '../helpers/data-response-format';
import { generateId } from '../helpers/generate-id';
import { readBodyChunks } from '../helpers/read-body-chunks';

import emails from '../local-storage/emails.json';

export const getEmails = async (req: Request, res: Response) => {
  const emailsFormattedData = await dataResponseFormat(req, emails);
  res.send(emailsFormattedData);
};

export const getEmailById = (req: Request, res: Response) => {
  const emailId = req.params.id;
  const email = emails.filter((emailItem) => emailItem.id === emailId);

  if (!email.length) {
    throw new NotFound('Email not found');
  }

  return res.send(...email);
};

export const createEmail = (req: Request, res: Response) => {
  let attachments;
  if (req.files && Array.isArray(req.files)) {
    attachments = req.files.map((file) => `/uploads/${file.filename}`);
  }

  let newEmail = { ...req.body, id: generateId(), attachments };

  if (!Array.isArray(emails)) {
    return res.status(500).send('Storage file email.json is corrupted');
  }
  emails.push(newEmail);
  res.status(201).send({ status: 'OK', email: newEmail });
};

export const updateEmail = (req: Request, res: Response) => {
  const emailId = req.params.id;

  let email = emails.find((email) => email.id === emailId);

  if (!email) {
    throw new NotFound('Email not found');
  }

  Object.assign(email, req.body);

  res.send(email);
};

export const deleteEmail = (req: Request, res: Response) => {
  const emailId = req.params.id;

  const emailPosition = emails.findIndex((email) => email.id === emailId);

  if (emailPosition === -1) {
    throw new NotFound('Email not found');
  }

  emails.splice(emailPosition, 1);

  res.sendStatus(204);
};
