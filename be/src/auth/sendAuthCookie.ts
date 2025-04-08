import { getEnv } from '../util';
import { sign } from 'jsonwebtoken';
import { Response } from 'express';

export const sendAuthCookie = (res: Response, username: string) => {
  const token = generateToken(username);
  res.cookie('token', token, {
    httpOnly: true,
    secure: getEnv('NODE_ENV') === 'production', // secure in prod only
    sameSite: 'strict',
    maxAge: 360000, // 1 hour
    path: '/', // Send cookie to all routes
  });
};

const generateToken = (username: string): string => {
  return sign({ userId: username }, getEnv('JWT_SECRET'), { expiresIn: '1h' });
};
