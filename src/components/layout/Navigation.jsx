import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

/**
 * Bottom navigation component with main app navigation links
 */
function Navigation() {
    const location = useLocation();

    // Check if the current path matches the nav item path
    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="bottom-navigation">
            <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
                <div className="nav-icon">🏠</div>
                <span className="nav-label">Home</span>
            </Link>
            <Link to="/explore" className={`nav-item ${isActive('/explore') ? 'active' : ''}`}>
                <div className="nav-icon">🔍</div>
                <span className="nav-label">Explore</span>
            </Link>
            <Link to="/upload" className={`nav-item ${isActive('/upload') ? 'active' : ''}`}>
                <div className="nav-icon">➕</div>
                <span className="nav-label">Upload</span>
            </Link>
            <Link to="/notifications" className={`nav-item ${isActive('/notifications') ? 'active' : ''}`}>
                <div className="nav-icon">🔔</div>
                <span className="nav-label">Notifications</span>
            </Link>
            <Link to="/profile" className={`nav-item ${isActive('/profile') ? 'active' : ''}`}>
                <div className="nav-icon">👤</div>
                <span className="nav-label">Profile</span>
            </Link>
        </nav>
    );
}

export default Navigation;