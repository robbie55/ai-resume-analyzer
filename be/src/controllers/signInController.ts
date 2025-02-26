import { Request, Response, NextFunction, RequestHandler } from 'express';
import { signIn } from '../auth/signIn';
import { Success } from '../types';

/**
 * signInController handles delegating user information to attempt to login a user
 *
 * @param req Express Request
 * @param res Express Response
 * @param next Express next()
 * @returns
 */
export const signInController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body;
    const success: Success = await signIn(username, password);
    res.status(200).json({ success });
  } catch (error) {
    console.error('Error in signUpController: ' + error);
    next(error);
  }
};
