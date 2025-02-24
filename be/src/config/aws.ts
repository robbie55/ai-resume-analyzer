import { S3Client } from '@aws-sdk/client-s3';
import { getEnv } from '../util';

// setup s3 client
const s3 = new S3Client({
  region: getEnv('AWS_REGION'),
  credentials: {
    accessKeyId: getEnv('AWS_ACCESS_KEY'),
    secretAccessKey: getEnv('AWS_SECRET'),
  },
});

export default s3;
