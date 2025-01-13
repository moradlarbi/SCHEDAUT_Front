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
import CalendarPage from './pages/CalendarPage';

// Role-based route guard
const ProtectedRoute = ({ role, user, children }: { role: string; user: any; children: JSX.Element }) => {
    if (!user) return <Navigate to="/login" />;
    return children;
};

const AppRoutes: React.FC = () => {
    const { user } = useAuth();

    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={user.role ==="admin" ? "/calendar":"/pcalendar"} />} />
            <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to={user.role ==="admin" ? "/calendar":"/pcalendar"} />} />
            
             {/* Teacher Routes */}
             <Route
                element={
                    <ProtectedRoute role="teacher" user={user}>
                        <Layout />
                    </ProtectedRoute>
                }
            >
                <Route path="/pcalendar" element={<DashboardPage />} />
                <Route path="/" element={<Navigate to="/pcalendar" />} />
            </Route>

            {/* Admin Routes */}
            <Route
                element={
                    <ProtectedRoute role="admin" user={user}>
                        <Layout />
                    </ProtectedRoute>
                }
            >
                <Route path="/users" element={<UsersPage />} />
                <Route path="/salles" element={<SallesPage />} />
                <Route path="/classes" element={<ClassPage />} />
                <Route path="/courses" element={<CoursePage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/" element={<Navigate to="/calendar" />} />
            </Route>

           
            {/* Catch-all Routes */}
            <Route path="/publicCalendar" element={<CalendarPage />} />
            <Route path="*" element={<Navigate to={user ? user.role ==="admin" ? "/calendar" :"/pcalendar" : "/login"} />} />
            
        </Routes>
    );
};

export default AppRoutes;
