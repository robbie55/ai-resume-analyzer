import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getEnv } from '../util';
import s3 from '../config/aws';

interface Success {
  success: boolean;
  key?: string;
  error?: Error;
}

export const uploadFileS3 = async (
  file: Express.Multer.File
): Promise<Success> => {
  const fileKey = `resumes/robbie/${Date.now()}`; // update to include username

  const command = new PutObjectCommand({
    Bucket: getEnv('S3_BUCKET_NAME'),
    Key: fileKey,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  try {
    await s3.send(command);
    return { success: true, key: fileKey };
  } catch (err) {
    console.error('Error sending s3 command: ' + err);
    return { success: false, error: err as Error };
  }
};
