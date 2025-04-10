'use client';

import Home from '@/components/Home';
import { AuthProvider } from '@/context/AuthContext';

export default function Page() {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
}
