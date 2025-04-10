import React, { useState, useContext, createContext, ReactNode } from 'react';

interface AuthContextType {
  user: string | null;
  login: (username: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: (username: string): void => {},
});

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (username: string): void => {
    if (!username) return;
    setUser(username);
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};
