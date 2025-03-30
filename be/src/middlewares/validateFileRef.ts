import { Request, Response, NextFunction, RequestHandler } from 'express';
import { serverError } from '../util/serverCodes';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getEnv } from '../util';
import s3 from '../config/aws';

/**
 *  validateFileRef handles validating a files existence in S3
 *
 * @param req Express Request
 * @param res Express Response
 * @param next Express next()
 * @returns
 */
export const validateFileRef: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.body?.filePath) {
    console.log(req.body);
    return serverError(400, 'File reference is required', res);
  }
  if (
    !req.body?.fileType ||
    (req.body.fileType !== 'pdf' && req.body.fileType !== 'docx')
  ) {
    return serverError(400, 'Invalid File Type', res);
  }
  const { filePath } = req.body;

  // check if file exists (S3 future, for now local storage in uploads folder)
  const fileExists = await checkFileExists(filePath);
  if (!fileExists) {
    return serverError(400, 'File not found', res);
  }

  next();
};

const checkFileExists = async (filePath: string): Promise<boolean> => {
  const command: GetObjectCommand = new GetObjectCommand({
    Bucket: getEnv('S3_BUCKET_NAME'),
    Key: filePath,
  });

  try {
    await s3.send(command);
  } catch (error: any | { Code: string }) {
    if (error.Code == 'NoSuchKey') {
      return false;
    }
  }

  return true;
};
