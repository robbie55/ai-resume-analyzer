import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getEnv } from '../util';
import s3 from '../config/aws';
import { Success } from '../types';

/**
 * uploadFileS3 handles sending a PutObject cmd to S3 bucket
 *
 * @param file file to be uploaded to S3
 * @returns
 */
export const uploadFileS3 = async (
  file: Express.Multer.File,
  user: string
): Promise<Success> => {
  const fileKey = `resumes/${user}/${Date.now()}`; // update to include username

  const command: PutObjectCommand = new PutObjectCommand({
    Bucket: getEnv('S3_BUCKET_NAME'),
    Key: fileKey,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  try {
    await s3.send(command);
    return { success: true, message: fileKey };
  } catch (err) {
    console.error('Error sending S3 PutObject command: ' + err);
    return {
      success: false,
      message: 'Error sending S3 PutObject command',
    };
  }
};
