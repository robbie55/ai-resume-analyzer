import { Request, Response, NextFunction, RequestHandler } from 'express';
import fs from 'fs';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

/**
 * parseFile handles parsing uploaded file into markdown
 *
 * @param req Express Request
 * @param res Express Response
 * @param next Express next()
 */
export const parseFile: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { fileType, filePath } = req.body;
  let markdown: string;
  try {
    if (fileType == 'pdf') {
      markdown = await parsePdf(filePath);
    } else {
      markdown = await parseDocx(filePath);
    }

    req.parsedMarkdown = markdown;
  } catch (error) {
    console.error('Error parsing file: ', error);
    next(error);
  }

  next();
};

const parsePdf = async (filePath: string): Promise<string> => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
};

const parseDocx = async (filePath: string): Promise<string> => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await mammoth.convertToHtml({ buffer: dataBuffer });
  return data.value;
};
