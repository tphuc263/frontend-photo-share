import { Link } from 'react-router-dom';
import './NotFound.css';

/**
 * 404 Not Found page component
 */
function NotFound() {
    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404</h1>
            <p className="not-found-message">Oops! Page not found.</p>
            <p className="not-found-description">
                The page you are looking for might have been removed, had its
                name changed, or is temporarily unavailable.
            </p>
            <Link to="/" className="home-link">
                Return to Home
            </Link>
        </div>
    );
}

export default NotFound;