import { Request, Response, NextFunction, RequestHandler } from 'express';
import { createUser } from '../services/signUp';
import { Success } from '../types';

/**
 * signUpController handles delegating user information to store a new user in db
 *
 * @param req Express Request
 * @param res Express Response
 * @param next Express next()
 * @returns
 */
export const signUpController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password, email } = req.body;
    const success: Success = await createUser(username, password, email);
    res.status(201).json({ message: 'User created successfully', success });
  } catch (error) {
    console.error('Error in signUpController: ' + error);
    next(error);
  }
};
