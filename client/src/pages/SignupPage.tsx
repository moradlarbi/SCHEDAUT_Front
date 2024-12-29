import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/LoginPage.css'; // Ajouter un fichier CSS pour la page d'inscription (optionnel)

const SignupPage: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            // Inscription et connexion
            await login(email, password); // Connexion après inscription
            setError(null);
            window.location.href = '/dashboard'; // Redirection vers le tableau de bord après inscription
        } catch (error) {
            setError('Failed to sign up. Please check your details.');
        }
    };

    return (
        <div className='body'>
        <div className="container">
            <div className="form-box signup">
                <form onSubmit={handleSubmit}>
                    <h1>Sign Up</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <i className="bx bxs-user"></i>
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                        <i className="bx bxs-user"></i>
                    </div>
                    <div className="input-box">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <i className="bx bxs-user"></i>
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <i className="bx bxs-lock-alt"></i>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="btn">Sign Up</button>
                    
                    <p>or Sign Up with Social Platforms</p>
                    <div className="social-icons">
                        <a href="#"><i className="bx bxl-google"></i></a>
                        <a href="#"><i className="bx bxl-facebook"></i></a>
                        <a href="#"><i className="bx bxl-github"></i></a>
                        <a href="#"><i className="bx bxl-linkedin"></i></a>
                    </div>
                </form>
            </div>

            <div className="toggle-box">
                <div className="toggle-panel toggle-left">
                <h1>Welcome Back!</h1>
                    <p>Already have an Account?</p>
                    <Link to="/login">
                        <button className="btn login-btn">Login</button>
                    </Link>
                </div>
               
            </div>
        </div>
        </div>
    );
};

export default SignupPage;
