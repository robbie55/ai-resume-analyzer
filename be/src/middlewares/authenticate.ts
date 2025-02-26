import { Request, Response, NextFunction, RequestHandler } from 'express';
import { serverError, getEnv } from '../util';
import { JwtPayload, verify } from 'jsonwebtoken';

/**
 * authenticate handles validating user token to protect routes
 *
 * @param req Express Request
 * @param res Express Response
 * @param next Express next()
 */
export const authenticate: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers?.authorization?.split(' ')[1]; // Extract token after "Bearer"

  if (!token) {
    return serverError(401, 'Unauthorized', res);
  }

  try {
    const decoded: JwtPayload = verify(
      token,
      getEnv('JWT_SECRET')
    ) as JwtPayload;
    req.user = decoded.userId;
    next();
  } catch (error) {
    console.error(`Error verifying token: ${error}`);
    return serverError(403, 'Invalid Token', res);
  }
};
