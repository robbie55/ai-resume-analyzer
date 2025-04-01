import { Button } from './button';

interface SignUpProps {
  handleSignInClick: () => void;
}

export default function SignUp({ handleSignInClick }: SignUpProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-center text-gray-200">
        Sign Up
      </h3>
      <form className="space-y-2">
        <input
          type="text"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded-lg text-gray-200"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded-lg text-gray-200"
        />
        <Button
          onClick={() => {}}
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
