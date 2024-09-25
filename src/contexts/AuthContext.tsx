import React, { createContext, useContext, useState, ReactNode } from 'react';
import { getToken, postLogin } from '../services/AuthService';
import { useHistory } from 'react-router-dom';

interface AuthContextType {
  user: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const history = useHistory();

  const login = async (email: string, password: string) => {
    try {
      const res = await postLogin({ email, password });
      setUser(email);
      history.push('/home');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    history.push('/login');
  };

  // Verifica si existe un token en el localStorage
  const isAuthenticated = !!getToken();

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe de ser usado con un AuthProvider');
  }
  return context;
};
