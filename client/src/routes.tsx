import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import Layout from './layouts/Layout';
import UsersPage from './pages/UsersPage';
import SallesPage from './pages/SallesPage';
import { useAuth } from './contexts/AuthContext';
import ClassPage from './pages/ClassPage';
import CoursePage from './pages/CoursePage';

const AppRoutes: React.FC = () => {
    const { user } = useAuth();

    return (
            <Routes>
                <Route path="/login" element={user==null ? <LoginPage /> : <Navigate to="/dashboard" />} />
                <Route path="/signup" element={user==null ? <SignupPage /> : <Navigate to="/dashboard" />} />
                <Route element={!user ? <Layout /> : <LoginPage />}>
                    <Route path="/dashboard" element={<DashboardPage />}/>
                    <Route path="/users" element={<UsersPage />}/>
                    <Route path="/salles" element={<SallesPage />}/>
                    <Route path="/classes" element={<ClassPage />}/>
                    <Route path="/courses" element={<CoursePage />}/>
                    <Route path="/" element={<DashboardPage />}/>
                    

                </Route>
                
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
    );
};

export default AppRoutes;
