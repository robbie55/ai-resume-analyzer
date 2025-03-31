import React, { ReactNode } from 'react';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

// Button Component
export function Button({
  onClick,
  disabled = false,
  className,
  children,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} px-4 py-2 rounded-lg text-white ${
        disabled ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
      }`}
    >
      {children}
    </button>
  );
}
