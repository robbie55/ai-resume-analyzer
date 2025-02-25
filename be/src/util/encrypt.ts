import { hash, compare } from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = 10;
  return await hash(password, salt);
};

export const comparePasswords = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await compare(password, hash);
};
