import React, { createContext, useReducer, useContext, ReactNode, useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

interface AuthState {
  user: User | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: { type: string; payload?: User }): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload || null };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const initializeAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('/auth/isAuthenticated', {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({ type: 'LOGIN', payload: response.data.data });
      } catch {
        dispatch({ type: 'LOGOUT' });
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('/auth/login', { email, password });
      const { token, data } = response.data;

      localStorage.setItem('token', token);
      dispatch({ type: 'LOGIN', payload: data });
      navigate(data.role === 'admin' ? '/users' : '/pcalendar');
    } catch (error: any) {
      console.error('Login failed:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = async () => {
    try {
      await axios.get('/auth/logout');
    } catch (error) {
      console.warn('Failed to logout from server:', error);
    } finally {
      dispatch({ type: 'LOGOUT' });
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  if (loading) return <div>Loading...</div>;

  return <AuthContext.Provider value={{ ...state, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
