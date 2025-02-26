import User from '../models/User';
import { IUser, Success } from '../types';
import { hashPassword } from '../util';

/**
 * createUser encrypts and creates and stores a user to mongoDB atlas
 *
 * @param username
 * @param password
 * @param email
 * @returns
 */
export const signUp = async (
  username: string,
  password: string,
  email: string
): Promise<Success> => {
  let success: Success = { success: false, message: '' };
  try {
    const hashedPassword: string = await hashPassword(password);

    const newUser: IUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    success = {
      success: true,
      message: `Successfully created new user ${username}`,
    };

    return success;
  } catch (error) {
    console.error('Error in createUser: ', error);
    throw new Error('There was an issue creating your account');
  }
};
