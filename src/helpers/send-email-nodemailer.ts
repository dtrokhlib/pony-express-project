import nodemailer from 'nodemailer';
import { IEmailDocument } from '../models/interfaces/email-model.interface';

export const sendEmailNodemailer = async (emailData: IEmailDocument) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_USR,
      pass: process.env.NODEMAILER_PWD,
    },
  });
  try {
  let info = await transporter.sendMail({
    from: emailData.from,
    to: emailData.to,
    subject: emailData.subject,
    text: emailData.body,
    html: emailData.body,
  });

  if(info) return { status: true };
  } catch(err) {
    return { status: false, err };
  }

}
