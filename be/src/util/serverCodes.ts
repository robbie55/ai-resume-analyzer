import { Response } from 'express';

/**
 *
 * @param code status code
 * @param message error message
 * @param res Express Response
 */
export const serverError = (code: number, message: string, res: Response) => {
  res.status(code).json({ error: message });
};
