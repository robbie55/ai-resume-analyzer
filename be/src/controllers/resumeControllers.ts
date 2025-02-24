import { Request, Response, NextFunction, RequestHandler } from 'express';
import { uploadFileS3 } from '../services/uploadHandler';
import { serverError } from '../util/serverCodes';

export const uploadResume: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      // This is just to satisfy TS; it should never happen due to validateFile
      return serverError(400, 'No file uploaded', res);
    }

    const uploadedFile = await uploadFileS3(req.file);
    res
      .status(201)
      .json({ message: 'Resume uploaded successfully', file: uploadedFile });
  } catch (error) {
    console.error('Error in uploadResume: ' + error);
    next(error);
  }
};
