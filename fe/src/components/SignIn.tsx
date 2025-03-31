import { useState } from 'react';
import { Button } from './button';
import axios from 'axios';

interface SignInProps {
  handleSignUpClick: () => void;
}

export default function SignIn({ handleSignUpClick }: SignInProps) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const signIn = async () => {};

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-center">Sign In</h3>
      <form className="space-y-2">
        <input
          type="text"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <Button
          onClick={() => {}}
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
