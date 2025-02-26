/* eslint-disable react-refresh/only-export-components */
'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<{
  isAuthenticated: boolean;
  setIsAuthenticated: (authenticated: boolean) => void;
}>({
  isAuthenticated: false,
  setIsAuthenticated: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const changed = token ? true : false;
    setIsAuthenticated(changed);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);