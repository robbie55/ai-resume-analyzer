import { ApiResponse } from '@/types';
import axios from 'axios';

const validateInput = (input: String): boolean => {
  return input.trim().length === 0;
};

export const signIn = async (
  username: string,
  password: string
): Promise<boolean> => {
  if (!validateInput(username) || !validateInput(password)) {
    // do something
  }
  try {
    const { data: success }: ApiResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_SIGNIN_PATH}/api/sign-in`,
      {
        username,
        password,
      }
    );

    console.log(success);

    if (!success.success) {
      console.error('Error signing in: ' + success.message);
    }
    return true;
  } catch (err) {
    console.error('Error in Sign In API call: ' + err);
    return false;
  }
};

export const signUp = async (
  username: string,
  password: string
): Promise<boolean> => {
  if (!validateInput(username) || !validateInput(password)) {
    // do something
  }
  try {
    const { data: success }: ApiResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_SIGNIN_PATH}/api/sign-up`,
      {
        username,
        password,
      }
    );

    if (!success.success) {
      console.error('Error signing up: ' + success.message);
    }
    return true;
  } catch (err) {
    console.error('Error in Sign Up API call: ' + err);
    return false;
  }
};
