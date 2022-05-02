import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';

// Old logger realization for history
// export const logger = (req: Request, res: Response, next: NextFunction) => {
//   console.log(`${req.method} ${req.url} - ${new Date()}`);
//   next();
// };

export const logger = morgan('tiny');
