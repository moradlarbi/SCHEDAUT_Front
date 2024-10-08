import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import Layout from './layouts/Layout';


const AppRoutes: React.FC = () => {
    const { user } = {user: null} //useAuth();

    return (
            <Routes>
                {/* <Route path="/login" element={user==null ? <LoginPage /> : <Navigate to="/dashboard" />} />
                <Route path="/signup" element={user==null ? <SignupPage /> : <Navigate to="/dashboard" />} /> */}
                <Route element={!user ? <Layout /> : <LoginPage />}>
                    <Route path="/dashboard" element={<DashboardPage />}/>
                    
                    <Route path="/" element={<DashboardPage />}/>

                </Route>
                
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
    );
};

export default AppRoutes;
