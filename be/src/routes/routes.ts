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
  analyzeController,
  signUpController,
  signInController,
} from '../controllers';
import upload from '../config/multerConfig';
import { authenticate } from '../middlewares/authenticate';

const router = Router();

// Handles file validation and upload to S3
router.post(
  '/api/upload',
  authenticate,
  upload.single('resume'),
  validateFile,
  uploadController
);
// Handles file existence validation, parsing file to markup, and passing markup to openAI
router.post(
  '/api/analyze',
  authenticate,
  validateFileRef,
  parseFile,
  analyzeController
);
// Handles validating input, encryption and storing user in db
router.post('/api/sign-up', validateFields, doesUserExist, signUpController);
// Handles user sign in
router.post('/api/sign-in', validateFields, signInController);

export default router;
