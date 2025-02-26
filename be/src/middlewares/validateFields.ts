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
  const { path } = req.route;
  const isLogin = isSignIn(path);
  const { email, username, password } = req.body;

  if (isLogin) {
    // For login, only check for username and password
    if (!username || !password) {
      return serverError(400, 'Username and password are required', res);
    }
  } else {
    // For registration, check for email, username, and password
    if (!email || !username || !password) {
      return serverError(400, 'All fields are required', res);
    }

    if (!v.isEmail(email)) {
      return serverError(400, 'Invalid email format', res);
    }
  }

  if (!v.isStrongPassword(password)) {
    return serverError(
      400,
      'Password must be at least 8 characters and contain a lowercase, uppercase, number, and special character',
      res
    );
  }

  next();
};

/**
 * isSignIn handles a boolean check for sign-in path
 *
 * @param path path of the API request
 * @returns
 */
const isSignIn = (path: string): boolean => {
  if (path.includes('in')) return true;
  return false;
};
