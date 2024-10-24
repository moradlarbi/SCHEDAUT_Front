// src/pages/DashboardPage.tsx
import React from 'react';
import { Typography } from '@mui/material';
import SchoolCalendar from '../components/SchoolCalendar';

const DashboardPage: React.FC = () => {
    return (
        <div>
            <Typography variant="h4">Dashboard</Typography>
            <Typography>Welcome to the dashboard!</Typography>
            <SchoolCalendar />
        </div>
    );
};

export default DashboardPage;
