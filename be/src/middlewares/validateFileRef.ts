import { Request, Response, NextFunction, RequestHandler } from 'express';
import { serverError } from '../util/serverCodes';

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

const checkFileExists = (filePath: String): boolean => {
  // handle logic for eventual S3 retrieval using SDK
  // if (filePath != 'something') {
  //   return false;
  // }
  return true;
};
