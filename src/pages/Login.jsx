import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './Login.css';

/**
 * Login page component
 */
function Login() {
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
        if (!username || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            setLoading(true);

            // Simulate API call
            // In a real app, this would be a fetch to your backend
            setTimeout(() => {
                // Mock successful login
                const userData = {
                    id: 'user123',
                    username: username,
                    name: 'Test User',
                    avatar: 'https://via.placeholder.com/50'
                };

                // Store user data and auth status
                setUser(userData);
                setIsAuthenticated(true);

                // Store token in localStorage (in a real app)
                // localStorage.setItem('token', 'mock-jwt-token');

                // Redirect to home page
                navigate('/');

                setLoading(false);
            }, 1000);
        } catch (err) {
            setError('Login failed. Please check your credentials.');
            setLoading(false);
            console.error('Login error:', err);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="app-title">PhotoShare</h1>

                <form onSubmit={handleSubmit} className="auth-form">
                    {error && <div className="auth-error">{error}</div>}

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

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>

                <div className="auth-links">
                    <Link to="/forgot-password" className="auth-link">
                        Forgot password?
                    </Link>
                </div>
            </div>

            <div className="auth-alternate">
                <p>Don't have an account? <Link to="/register" className="auth-link">Sign up</Link></p>
            </div>
        </div>
    );
}

export default Login;