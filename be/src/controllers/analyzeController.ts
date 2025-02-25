import { Request, Response, NextFunction, RequestHandler } from 'express';
import { analyzeResume } from '../services/analyzeResume';
import { Success } from '../types';

/**
 * analyzeController handles delegating file analyzating to openAI's API
 *
 * @param req Express Request
 * @param res Express Response
 * @param next Express next()
 * @returns
 */
export const analyzeController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const success: Success = await analyzeResume(req.parsedMarkdown);
    res.status(201).json({ message: 'Resume analyzed successfully', success });
  } catch (error) {
    console.error('Error in analyzeController: ' + error);
    next(error);
  }
};
