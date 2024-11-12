// src/App.tsx
import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import AppRoutes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './styles';
const App: React.FC = () => {
    return (
        <ThemeProvider>
            <Router>
                <AuthProvider>
                    <AppRoutes />
                </AuthProvider>
            </Router>
        </ThemeProvider>
    );
};

export default App;