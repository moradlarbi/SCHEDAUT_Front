import React from 'react';
import { Typography, Box, Paper, Grid, Button } from '@mui/material';
import SchoolCalendar from '../components/SchoolCalendar';

const DashboardPage: React.FC = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#f4f7fc', // Fond léger et moderne pour la page
                minHeight: '100vh',
                padding: 5,
            }}
        >
            <Box
                sx={{
                    marginBottom: 4,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 700,
                        color: '#2c3e50',
                        marginBottom: 2,
                        fontSize: '2.5rem',
                        letterSpacing: '1px',
                    }}
                >
                    Dashboard
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        color: '#7f8c8d',
                        marginBottom: 3,
                        fontWeight: 400,
                        fontSize: '1.1rem',
                    }}
                >
                    Welcome to your personalized dashboard, manage your schedule effortlessly!
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        marginBottom: 4,
                        '&:hover': { backgroundColor: '#3498db' },
                        padding: '12px 25px',
                        fontSize: '1rem',
                        borderRadius: '30px', // Bouton arrondi pour un effet moderne
                    }}
                >
                    Explore More
                </Button>
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={12}>
                    <Paper
                        sx={{
                            padding: 4,
                            backgroundColor: '#ffffff',
                            boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)', // Ombre plus marquée pour une profondeur
                            borderRadius: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '1000px', 
                            marginLeft:'-50px',
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                marginBottom: 3,
                                fontWeight: 600,
                                fontSize: '1.5rem',
                                color: '#34495e',
                            }}
                        >
                            Your Calendar
                        </Typography>
                        <Box
                            sx={{
                                padding: '30px',
                                backgroundColor: '#ecf0f1', // Fond clair et doux
                                borderRadius: '15px', // Coins arrondis pour un aspect moderne
                                boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)', // Ombre légère
                                width: '100%',
                            }}
                        >
                            <SchoolCalendar />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DashboardPage;
