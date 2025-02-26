import multer, { StorageEngine } from 'multer';

// Defines store destination and how it's saved
const storage: StorageEngine = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB upload size
  },
});

export default upload;
