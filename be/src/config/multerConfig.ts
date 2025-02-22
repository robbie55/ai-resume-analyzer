import multer, { diskStorage, StorageEngine } from 'multer';
import path from 'path';
import { Request } from 'express';

type destinationCb = (error: Error | null, destination: string) => void;
type filenameCb = (error: Error | null, filename: string) => void;

// Defines store destination and how it's saved
const storage: StorageEngine = diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: destinationCb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req: Request, file: Express.Multer.File, cb: filenameCb) => {
    const uniqueSuffix: string =
      Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB upload size
  },
});

export default upload;
