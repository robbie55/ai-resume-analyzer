import { Request, Response, NextFunction, RequestHandler } from 'express';
import { processResumeUpload } from '../services/uploadHandler';

export const uploadResume: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      // This is just to satisfy TS; it should never happen due to validateFile
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const uploadedFile = await processResumeUpload(req.file);
    res
      .status(201)
      .json({ message: 'Resume uploaded successfully', file: uploadedFile });
  } catch (error) {
    console.error('Error in uploadResume: ' + error);
    next(error);
  }
};
