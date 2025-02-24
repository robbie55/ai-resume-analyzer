import { Request, Response, NextFunction, RequestHandler } from 'express';
import { serverError } from '../util/serverCodes';

export const validateFile: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.file) {
    console.log(req);
    return serverError(400, 'No file uploaded', res);
  }

  // PDF, DOC, DOCX
  const allowedTypes: String[] = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  if (!allowedTypes.includes(req.file.mimetype)) {
    return serverError(400, 'Invalid file type', res);
  }

  next();
};
