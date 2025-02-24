import { Request, Response, NextFunction, RequestHandler } from 'express';
import { serverError } from '../util/serverCodes';
import fs from 'fs';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

export const parseFile: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { fileType, filePath } = req.body;
  let markdown: string;
  if (fileType == 'pdf') {
    markdown = await parsePdf(filePath);
  } else {
    markdown = await parseDocx(filePath);
  }

  req.parsedMarkdown = markdown;

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
