// authContext.tsx
'use client'
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { loginInputs } from '../login/page';
import { LoginFetch } from '../lib/data';

type User = {
    user: {
      id: number;
      user_email: string;
      user_handle: string;
    };
    profile: {
      // Estructura de tu perfil aquí
    } | null;
  };
  

type AuthContextType = {
  user: User | null;
  login: (user_email: string, password: string) => Promise<Boolean>;
  logout: () => void;
};
type AuthProviderProps = {
    children: ReactNode;
  };
  
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children } ) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {

        const response = await fetch(`http://127.0.0.1:5000/fetch_user`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });                                 
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (user_email: string, password: string): Promise<Boolean> => {
    try {
      const loginData: loginInputs = { user_email, password };
      let status = await LoginFetch(loginData);
      if (status === 200) {
        fetchUser();
      } else {
        throw new Error('Failed to log in');
      }
      return true
    } catch (error) {
      console.error('Login error:', error);
      return false
    }
  };
  

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
