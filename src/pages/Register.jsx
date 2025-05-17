import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './Login.css'; // Reusing styles from Login

/**
 * Register page component
 */
function Register() {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { setIsAuthenticated, setUser } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!email || !fullName || !username || !password) {
            setError('Please fill in all fields');
            return;
        }

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        // Password strength check (simple example)
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        try {
            setLoading(true);

            // Simulate API call
            // In a real app, this would be a fetch to your backend
            setTimeout(() => {
                // Mock successful registration and login
                const userData = {
                    id: 'user123',
                    username: username,
                    name: fullName,
                    email: email,
                    avatar: 'https://via.placeholder.com/50'
                };

                // Store user data and auth status
                setUser(userData);
                setIsAuthenticated(true);

                // Redirect to home page
                navigate('/');

                setLoading(false);
            }, 1500);
        } catch (err) {
            setError('Registration failed. Please try again.');
            setLoading(false);
            console.error('Registration error:', err);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="app-title">PhotoShare</h1>
                <p className="auth-subtitle">Sign up to see photos from your friends.</p>

                <form onSubmit={handleSubmit} className="auth-form">
                    {error && <div className="auth-error">{error}</div>}

                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="auth-input"
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="auth-input"
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="auth-input"
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="auth-input"
                            disabled={loading}
                        />
                    </div>

                    <p className="terms-text">
                        By signing up, you agree to our Terms, Data Policy and Cookies Policy.
                    </p>

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
            </div>

            <div className="auth-alternate">
                <p>Have an account? <Link to="/login" className="auth-link">Log in</Link></p>
            </div>
        </div>
    );
}

export default Register;