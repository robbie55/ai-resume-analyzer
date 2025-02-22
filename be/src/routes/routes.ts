import { Router } from 'express';
import { validateFile } from '../middlewares/validateFile';
import { uploadResume } from '../controllers/resumeControllers';
import upload from '../config/multerConfig';

const router = Router();

// router.get('/', displayHome);
router.post('/upload', upload.single('resume'), validateFile, uploadResume);
// router.post('/analyze', analyzeResume);

export default router;
