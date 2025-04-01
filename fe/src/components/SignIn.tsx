import React, { useState } from 'react';
import { Button } from './button';
import axios from 'axios';
import { ApiSuccess } from '@/types';

interface SignInProps {
  handleSignUpClick: () => void;
}

export default function SignIn({ handleSignUpClick }: SignInProps) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const validateInput = (input: String): boolean => {
    return input.trim().length === 0;
  };

  const signIn = async (): Promise<void> => {
    if (!validateInput(username) || !validateInput(password)) {
      // do something
    }
    try {
      const success: ApiSuccess = await axios.post(
        `${process.env.NEXT_PUBLIC_SIGNIN_PATH}/api/sign-in`,
        {
          username,
          password,
        }
      );
    } catch (err) {
      console.error('Error in Sign In API call: ' + err);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-center text-gray-200">
        Sign In
      </h3>
      <form className="space-y-2">
        <input
          type="text"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg text-gray-200"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg text-gray-200"
        />
        <Button
          onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            await signIn();
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
