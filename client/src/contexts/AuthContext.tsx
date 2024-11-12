import React, { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

interface User {
    email: string;
}

interface AuthState {
    user: User | null;
}

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: { type: string, payload?: User }): AuthState => {
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
    const navigate = useNavigate();

    useEffect(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='));
        console.log(state)
        if (token) {
            axios.get('/auth/isAuthenticated').then(response => {
                dispatch({ type: 'LOGIN', payload: response.data });
                
            }).catch(() => {
                dispatch({ type: 'LOGOUT' });
            });
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post('/auth/login', { email, password });
            console.log(response.data)
            dispatch({ type: 'LOGIN', payload: { email: response.data.data.email } });
            navigate('/dashboard');
        } catch (error) {
            console.error('Failed to login:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await axios.get('/auth/logout');
            dispatch({ type: 'LOGOUT' });
            navigate('/dashboard');
        } catch (error) {
            console.error('Failed to logout:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ ...state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};