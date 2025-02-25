import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export const handleError: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error in controller:', err);

  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    success: false,
  });
};
