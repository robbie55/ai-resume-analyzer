import { Request, Response, NextFunction, RequestHandler } from 'express';
import { uploadFileS3 } from '../services/uploadHandler';
import { serverError } from '../util/serverCodes';
import { Success } from '../types';

/**
 * uploadController handles delegating file upload to S3 upload service
 *
 * @param req Express Request
 * @param res Express Response
 * @param next Express next()
 * @returns
 */
export const uploadController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      // This is just to satisfy TS; it should never happen due to validateFile
      return serverError(400, 'No file uploaded', res);
    }

    const success: Success = await uploadFileS3(req.file);
    res.status(201).json({ message: 'Resume uploaded successfully', success });
  } catch (error) {
    console.error('Error in uploadController: ' + error);
    next(error);
  }
};
