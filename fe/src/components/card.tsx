import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

// Card Component
export function Card({ children, className }: CardProps) {
  return (
    <div className={`bg-zinc-900 rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
}

// CardHeader Component
export function CardHeader({ children, className }: CardProps) {
  return (
    <div className={`p-4 border-b border-gray-200  font-semibold ${className}`}>
      {children}
    </div>
  );
}

// CardContent Component
export function CardContent({ children, className }: CardProps) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
