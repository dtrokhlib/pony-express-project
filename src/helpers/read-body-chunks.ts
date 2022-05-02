import { Request } from 'express';

export const readBodyChunks = (req: Request) =>
  new Promise((resolve) => {
    const chunks: Buffer[] = [];

    req.on('data', (chunk) => {
      chunks.push(chunk);
    });
    req.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
  });
