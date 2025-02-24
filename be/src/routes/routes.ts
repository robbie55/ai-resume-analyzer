import { Router } from 'express';
import { validateFile, validateFileRef, parseFile } from '../middlewares';
import { uploadResume } from '../controllers/resumeControllers';
import { analyzeResume } from '../services/analyzeResume';
import upload from '../config/multerConfig';

const router = Router();

// Handles file validation and upload to S3
router.post('/upload', upload.single('resume'), validateFile, uploadResume);
// Handles file existence validation, parsing file to markup, and passing markup to openAI
router.post('/analyze', validateFileRef, parseFile, analyzeResume);
// Handles validating input, encryption and storing user in db
router.post(
  '/register',
  validateFields,
  doesUserExist,
  encryptPassword,
  storeUser
);

export default router;
