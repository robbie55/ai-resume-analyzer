import dotenv from 'dotenv';

dotenv.config();

/**
 *
 * @param name string of env variable
 * @returns env variable value
 */
export const getEnv = (name: string): string => {
  if (!process.env[name]) {
    throw new Error(`Variable ${name} is undefined.`);
  }

  return process.env[name];
};
