// authContext.tsx
'use client'
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { loginInputs } from '../login/page';
import { LoginFetch } from '../lib/data';
import { ProfileInputs } from '../complete_profile/page';
import { useRouter } from 'next/navigation';

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
      state: string,
      avatar: string |null
    } | null;
  };
  

  type AuthContextType = {
    user: User | null;
    login: (user_email: string, password: string) => Promise<Boolean>;
    logout: () => void;
    postProfile: (data: FormData) => Promise<number | undefined>;
    loading : boolean
    PostRequest : (data : FormData) => Promise<number | undefined>
    PostService : (data : FormData) => Promise<number | undefined>
  };
type AuthProviderProps = {
    children: ReactNode;
  };
  
const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider: React.FC<AuthProviderProps> = ({ children } ) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter()
  const fetchUser = useCallback(async () => {
    setLoading(true); // Iniciar la carga
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/fetch_user`, {
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
      } finally {
        setLoading(false); // Finalizar la carga independientemente del resultado
      }
    } else {
      setLoading(false); // Si no hay token, también se finaliza la carga
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
    router.push('/')
  };


  async function postProfile(data: FormData): Promise<number | undefined> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found");
      return undefined;
    }
  
    try {
      let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post-profile`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data  
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
  
  async function PostRequest(data:FormData): Promise<number | undefined> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found");
      return undefined;
    }
    try {
      let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post-request`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data  
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.status
    } catch (error) {
      console.error("Error posting request:", error);
      return 500;
    }

  }

  async function PostService(data:FormData): Promise<number | undefined> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found");
      return undefined;
    }
    try {
      let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post-service`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data  
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.status
    } catch (error) {
      console.error("Error posting request:", error);
      return 500;
    }

  }


  return (
    <AuthContext.Provider value={{ user, login, logout, loading, postProfile, PostRequest, PostService}}>
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
