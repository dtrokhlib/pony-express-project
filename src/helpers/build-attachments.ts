import { Request } from 'express';

export const buildAttachments = (req: Request) => {
  if (req.files && Array.isArray(req.files)) {
    return req.files.map((file) => `/uploads/${file.filename}`);
  }
  return [];
};
