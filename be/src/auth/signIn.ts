import User from '../models/User';
import { IUser, Success } from '../types';
import { comparePasswords } from '../util';

/**
 * signIn checks user credentials and returns a token
 *
 * @param username
 * @param password
 * @param email
 * @returns
 */
export const signIn = async (
  username: string,
  password: string
): Promise<Success> => {
  let success: Success;
  try {
    const user: IUser | null = await User.findOne({ username });

    if (!user) {
      throw new Error('Invalid Username');
    }

    const compare = await comparePasswords(password, user.password);

    if (!compare) {
      throw new Error('Invalid Password');
    }

    success = {
      success: true,
      message: `Successfully logged in as ${username}`,
      data: username,
    };
  } catch (error) {
    console.error('Error in createUser: ', error);
    success = {
      success: false,
      message: 'There was an issue signing the client in',
    };
  }

  return success;
};
