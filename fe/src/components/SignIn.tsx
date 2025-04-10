import React, { useState } from 'react';
import { Button } from './button';
import { useAuth } from '@/context/AuthContext';
import { signIn } from '@/api/user';

interface SignInProps {
  handleSignUpClick: () => void;
  handleSignInError: (message: string) => void;
  clearError: () => void;
}

export default function SignIn({
  handleSignUpClick,
  handleSignInError,
  clearError,
}: SignInProps) {
  const { login } = useAuth();
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

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    const success: boolean = await signIn(username, password);
    if (!success) {
      handleSignInError('Invalid username or password, please try again');
      return;
    }

    login(username);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-center text-gray-200">
        Sign In
      </h3>
      <form className="space-y-2">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={setUser}
          className="w-full p-2 border border-gray-300 rounded-lg text-gray-200"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={setPass}
          className="w-full p-2 border border-gray-300 rounded-lg text-gray-200"
        />
        <Button
          onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
            await handleLogin(e);
          }}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          Sign In
        </Button>
      </form>
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={handleSignUpClick}
            className="text-blue-600 hover:text-blue-700"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
