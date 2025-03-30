import User from '../models/User';
import { IUser, Success } from '../types';
import { comparePasswords, getEnv } from '../util';
import { sign } from 'jsonwebtoken';

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
  try {
    const user: IUser | null = await User.findOne({ username });

    if (!user) {
      throw new Error('Invalid Username');
    }

    const compare = await comparePasswords(password, user.password);

    if (compare) {
      const success: Success = {
        success: true,
        message: `Successfully logged in as ${username}`,
        data: generateToken(username),
      };

      return success;
    } else {
      throw new Error('Invalid Password');
    }
  } catch (error) {
    console.error('Error in createUser: ', error);
    throw new Error('There was an issue creating your account');
  }
};

const generateToken = (username: string): string => {
  return sign({ userId: username }, getEnv('JWT_SECRET'), { expiresIn: '1h' });
};
