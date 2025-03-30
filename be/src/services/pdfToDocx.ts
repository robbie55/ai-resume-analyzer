import axios from 'axios';
import { getEnv } from '../util';
import { Success } from '../types';

/**
 * Handles calling python microservice lambda
 *
 * @param pdfBuffer pdf buffer to send to microservice
 */
export const pdfToDocx = async (pdfBuffer: Buffer): Promise<Success> => {
  try {
    const res = await axios.post(getEnv('PDF_SERVICE_API'), pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
      },
    });

    const { data } = res;

    const success: Success = {
      success: true,
      message: 'Succesful call to API gateway',
      data: data,
    };

    return success;
  } catch (error) {
    return {
      success: false,
      message: `Error calling PDF microservice ${error}`,
    };
  }
};
