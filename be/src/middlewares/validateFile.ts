import { Request, Response, NextFunction, RequestHandler } from 'express';

const error = (message: string, res: Response) => {
  res.status(400).json({ error: message });
};

export const validateFile: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    console.log(req);
    return error('No file uploaded', res);
  }

  // PDF, DOC, DOCX
  const allowedTypes: String[] = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  if (!allowedTypes.includes(req.file.mimetype)) {
    return error('Invalid file type', res);
  }

  next();
};
