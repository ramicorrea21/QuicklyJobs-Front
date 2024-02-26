// authContext.tsx
'use client'
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { loginInputs } from '../login/page';
import { LoginFetch } from '../lib/data';
import { ProfileInputs } from '../complete_profile/page';

type User = {
    user: {
      id: number;
      user_email: string;
      user_handle: string;
    };
    profile: {
      first_name: string,
      last_name: string,
      description: string,
      address: string,
      profession: string,
      category: string,
      phone: string,
      country: string,
      city: string,
      province: string,
    } | null;
  };
  

type AuthContextType = {
  user: User | null;
  login: (user_email: string, password: string) => Promise<Boolean>;
  logout: () => void;
  postProfile : <ProfileInputs>(data: ProfileInputs) => Promise<number | undefined>
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


  async function postProfile<ProfileInputs>(data: ProfileInputs): Promise<number | undefined> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found");
      return undefined; 
    }

    try {
      let response = await fetch('http://127.0.0.1:5000/post-profile', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const profileData = await response.json();
      setUser({ ...user, ...profileData });
      return response.status;
    } catch (error) {
      console.error("Error posting profile:", error);
      return 500; 
    }
}


  return (
    <AuthContext.Provider value={{ user, login, logout, postProfile}}>
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
