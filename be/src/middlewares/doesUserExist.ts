import { Request, Response, NextFunction, RequestHandler } from 'express';
import { serverError } from '../util';
import { IUser } from '../types';
import User from '../models/User';

/**
 * validateFields handles validating user input for sign up
 *
 * @param req Express Request
 * @param res Express Response
 * @param next Express next()
 */
export const doesUserExist: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, username } = req.body;

  let user: IUser | null = await User.findOne({ username });
  if (user != null) {
    return serverError(400, 'Username is already in use', res);
  }

  user = await User.findOne({ email });
  if (user != null) {
    return serverError(400, 'Email is already in use', res);
  }

  next();
};
