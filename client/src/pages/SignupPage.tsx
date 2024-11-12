// src/pages/SignupPage.tsx
import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const SignupPage: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [sexe, setSexe] = useState(false); // false for female, true for male
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            // Prepare the username by concatenating nom and prenom
            const username = `${firstName} ${lastName}`;

            // Make the API request to signup
            const response = await axios.post('/api/auth/signup', {
                email,
                password,
                firstName,
                lastName
            });
            console.log(response)

            // On successful signup, login the user
            login(email, password)

            // Redirect to the dashboard page
            window.location.href = '/dashboard';
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.log(err)
                setError(err?.response?.data.message || 'An error occurred during signup.');
            } else {
                setError('An error occurred during signup.');
            }
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100vh"
            >
                <Typography variant="h4" gutterBottom>Sign Up</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="First Name"
                        fullWidth
                        margin="normal"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        label="Last Name"
                        fullWidth
                        margin="normal"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* <FormControl component="fieldset" margin="normal">
                        <FormLabel component="legend">Sexe</FormLabel>
                        <RadioGroup
                            value={sexe ? 'male' : 'female'}
                            onChange={(e) => setSexe(e.target.value === 'male')}
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Student" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl> */}
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Sign Up
                    </Button>
                    {error && <Typography color="error" variant="body2">{error}</Typography>}
                </form>
            </Box>
        </Container>
    );
};

export default SignupPage;
