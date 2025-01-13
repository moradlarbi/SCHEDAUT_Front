import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom'; // Importer Link pour la navigation entre pages
import '../styles/LoginPage.css'; // Importer le fichier CSS contenant vos styles

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await login(email, password);
            setError(null);
        } catch (error) {
            setError('Failed to login. Please check your email and password.');
        }
    };

    return (
        <div className='body'>
        <div className="container">
            <div className="form-box login">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
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
                    <button type="submit" className="btn">Login</button>
                    
                </form>
            </div>

            <div className="toggle-box">
                <div className="toggle-panel toggle-left">
                    <h1>Hello, Welcome!</h1>
                    <p>Don't have an Account?</p>
                    <Link to="/signup">
                        <button className="btn register-btn">Register</button>
                    </Link>
                </div>
                <div className="toggle-panel toggle-right">
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

export default LoginPage;
