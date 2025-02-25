import { Request, Response, NextFunction, RequestHandler } from 'express';
import { serverError } from '../util';
import v from 'validator';

/**
 * validateFields handles validating user input for sign up
 *
 * @param req Express Request
 * @param res Express Response
 * @param next Express next()
 */
export const validateFields: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.body?.password || !req.body?.email || !req.body?.username) {
    return serverError(400, 'All fields are required', res);
  }

  const { email, password } = req.body;

  if (!v.isEmail(email)) {
    return serverError(400, 'Invalid email format', res);
  }

  if (!v.isStrongPassword(password)) {
    return serverError(
      400,
      'Password must be at least 8 characters and contain a lowercase, uppercase, number and special character',
      res
    );
  }

  next();
};
