import { Response } from 'express';

export const serverError = (code: number, message: string, res: Response) => {
  res.status(code).json({ error: message });
};
