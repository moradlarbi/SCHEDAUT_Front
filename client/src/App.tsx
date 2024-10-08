// src/App.tsx
import React from 'react';
import AppRoutes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './styles';
const App: React.FC = () => {
    return (
        <ThemeProvider>
            <Router>
                  <AppRoutes />
            </Router>
        </ThemeProvider>
    );
};

export default App;
