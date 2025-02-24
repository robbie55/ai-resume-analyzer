import { Router } from 'express';
import { validateFile, validateFileRef, parseFile } from '../middlewares';
import { uploadResume } from '../controllers/resumeControllers';
import { analyzeResume } from '../services/analyzeResume';
import upload from '../config/multerConfig';

const router = Router();

// router.get('/', displayHome);
router.post('/upload', upload.single('resume'), validateFile, uploadResume);
router.post('/analyze', validateFileRef, parseFile, analyzeResume);

export default router;
