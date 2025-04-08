import { Request, Response, NextFunction, RequestHandler } from 'express';
import { signIn } from '../auth/signIn';
import { Success } from '../types';
import { serverError } from '../util';
import { sendAuthCookie } from '../auth/sendAuthCookie';

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
    if (!success.success) {
      return serverError(401, 'Invalid Username or Password', res);
    }
    sendAuthCookie(res, username);
    res.status(200).json(success);
  } catch (error) {
    console.error('Error in signUpController: ' + error);
    next(error);
  }
};
