import { Request, Response, NextFunction, RequestHandler } from 'express';
import { GetObjectCommand, GetObjectCommandOutput } from '@aws-sdk/client-s3';

import mammoth from 'mammoth';
import { getEnv } from '../util';
import s3 from '../config/aws';
import { pdfToDocx } from '../services/pdfToDocx';
import { Success } from '../types';

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
  let markdown: string | null;
  try {
    let dataBuffer: Buffer = await getObjectBuffer(filePath);
    if (fileType == 'pdf') {
      const success: Success = await pdfToDocx(dataBuffer);
      if (!success.success || typeof success?.data !== 'string') {
        throw new Error(success.message);
      }
      dataBuffer = base64ToBuffer(success.data);
    }

    markdown = await parseDocx(dataBuffer);
    if (markdown === null) {
      throw Error('There was an issue parsing your file');
    }

    req.parsedMarkdown = markdown;
  } catch (error) {
    console.error('Error parsing file: ', error);
    next(error);
  }

  next();
};

// const parsePdf = async (filePath: string): Promise<string> => {
//   const dataBuffer: Buffer = await getObjectBuffer(filePath);
//   const data = await pdfParse(dataBuffer);
//   console.log(data.text);
//   return data.text;
// };

const parseDocx = async (dataBuffer: Buffer): Promise<string | null> => {
  try {
    const data = await mammoth.convertToHtml({ buffer: dataBuffer });
    return data.value;
  } catch (err) {
    console.error('Error parsing docx with mammoth: ' + err);
    return null;
  }
};

const getObjectBuffer = async (filePath: string): Promise<Buffer> => {
  const command: GetObjectCommand = new GetObjectCommand({
    Bucket: getEnv('S3_BUCKET_NAME'),
    Key: filePath,
  });

  const obj: GetObjectCommandOutput = await s3.send(command);

  if (!obj.Body) {
    throw new Error('File content is empty');
  }

  const streamToBuffer = async (
    stream: NodeJS.ReadableStream
  ): Promise<Buffer> => {
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk as Buffer);
    }

    return Buffer.concat(chunks);
  };
  return streamToBuffer(obj.Body as NodeJS.ReadableStream);
};

/**
 * base64ToBuffer handles converting an encoded bytearray into a Buffer
 *
 * @param byteCharacters base64 encoded binary string
 * @returns A PDF in the form of a buffer
 */
const base64ToBuffer = (byteCharacters: string): Buffer => {
  const decodedCharacters: Buffer<ArrayBuffer> = Buffer.from(
    byteCharacters,
    'base64'
  );
  const buffer: Buffer = Buffer.from(decodedCharacters);
  return buffer;
};
