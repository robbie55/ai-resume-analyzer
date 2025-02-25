import { Router } from 'express';
import {
  validateFile,
  validateFileRef,
  parseFile,
  validateFields,
  doesUserExist,
} from '../middlewares';
import {
  uploadController,
  signUpController,
  analyzeController,
} from '../controllers';
import upload from '../config/multerConfig';

const router = Router();

// Handles file validation and upload to S3
router.post('/upload', upload.single('resume'), validateFile, uploadController);
// Handles file existence validation, parsing file to markup, and passing markup to openAI
router.post('/analyze', validateFileRef, parseFile, analyzeController);
// Handles validating input, encryption and storing user in db
router.post('/sign-up', validateFields, doesUserExist, signUpController);

export default router;
