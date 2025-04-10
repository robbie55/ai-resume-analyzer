'use client';

import { useState } from 'react';
import { Button } from '../components/button';
import { Card, CardContent, CardHeader } from '../components/card';
import { UserPlus, LogIn } from 'lucide-react';
import SignUp from './SignUp';
import SignIn from './SignIn';

export default function LandingPage() {
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  const [showSignIn, setShowSignIn] = useState<boolean>(false);

  const [signInError, setSignInError] = useState<boolean>(false);
  const [signUpError, setSignUpError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSignInError = (message: string): void => {
    setSignInError(true);
    if (!message.trim()) {
      setErrorMessage('There was an issue logging you in');
      return;
    }
    setErrorMessage(message);
  };

  const clearSignInError = (): void => {
    setSignInError(false);
    setErrorMessage('');
  };

  const clearSignUpError = (): void => {
    setSignUpError(false);
    setErrorMessage('');
  };

  const handleSignUpError = (message: string): void => {
    setSignUpError(true);
    if (!message.trim()) {
      setErrorMessage('There was an issue logging you in');
      return;
    }
    setErrorMessage(message);
  };

  const handleSignUpClick = (): void => {
    setShowSignUp(true);
    setShowSignIn(false);
  };

  const handleSignInClick = (): void => {
    setShowSignUp(false);
    setShowSignIn(true);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-800">
      {(signInError || signUpError) && (
        <Card className="w-[500px]">
          <CardHeader className="text-m text-center text-[#FA8072]">
            {errorMessage}
          </CardHeader>
        </Card>
      )}
      <Card className="w-[500px] p-6 shadow-xl">
        <CardHeader className="text-2xl font-semibold text-center text-blue-600">
          AI Resume Analyzation
        </CardHeader>
        <CardContent className="space-y-4">
          <h2 className="text-lg text-center text-gray-200">
            {!showSignIn &&
              !showSignUp &&
              'Welcome to our platform! Please sign up or sign in to get started.'}
          </h2>

          {/* Show buttons if neither form is displayed */}
          {!showSignUp && !showSignIn && (
            <div className="flex flex-col gap-4">
              <Button
                className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700"
                onClick={handleSignUpClick}
              >
                <UserPlus className="w-5 h-5" />
                Sign Up
              </Button>

              <Button
                className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700"
                onClick={handleSignInClick}
              >
                <LogIn className="w-5 h-5" />
                Sign In
              </Button>
            </div>
          )}

          {/* Conditionally render Sign Up form */}
          {showSignUp && (
            <SignUp
              handleSignInClick={handleSignInClick}
              handleSignUpError={handleSignUpError}
              clearError={clearSignUpError}
            />
          )}

          {/* Conditionally render Sign In form */}
          {showSignIn && (
            <SignIn
              handleSignUpClick={handleSignUpClick}
              handleSignInError={handleSignInError}
              clearError={clearSignInError}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
