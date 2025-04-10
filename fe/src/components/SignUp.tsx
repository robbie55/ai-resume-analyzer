import { signUp } from '@/api/user';
import { Button } from './button';
import { useState } from 'react';

interface SignUpProps {
  handleSignInClick: () => void;
  handleSignUpError: (message: string) => void;
  clearError: () => void;
}

export default function SignUp({
  handleSignInClick,
  handleSignUpError,
  clearError,
}: SignUpProps) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const setUser = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const user: string = e.target.value;
    if (user.length > 1 && !user.trim()) return;
    clearError();
    setUsername(user);
  };

  const setPass = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const pass: string = e.target.value;
    if (pass.length > 1 && !pass.trim()) return;
    clearError();
    setPassword(pass);
  };

  const handleSignUp = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    const success: boolean = await signUp(username, password);
    if (!success) {
      handleSignUpError('Invalid username or password, please try again');
      return;
    }
    handleSignInClick();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-center text-gray-200">
        Sign Up
      </h3>
      <form className="space-y-2">
        <input
          type="text"
          placeholder="Username"
          onChange={setUser}
          className="w-full p-2 border border-gray-300 rounded-lg text-gray-200"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={setPass}
          className="w-full p-2 border border-gray-300 rounded-lg text-gray-200"
        />
        <Button
          onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
            await handleSignUp(e);
          }}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Sign Up
        </Button>
      </form>
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <button
            onClick={handleSignInClick}
            className="text-blue-600 hover:text-blue-700"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
