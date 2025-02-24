import multer, { StorageEngine } from 'multer';
import path from 'path';
import { Request } from 'express';

type destinationCb = (error: Error | null, destination: string) => void;
type filenameCb = (error: Error | null, filename: string) => void;

// Defines store destination and how it's saved
const storage: StorageEngine = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB upload size
  },
});

export default upload;
