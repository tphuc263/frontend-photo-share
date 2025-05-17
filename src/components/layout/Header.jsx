import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import './Header.css';

/**
 * Header component with logo, search bar and action buttons
 */
function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useUser();

    const handleSearch = (e) => {
        e.preventDefault();
        // Search logic here
        console.log('Searching for:', searchTerm);
    };

    return (
        <header className="app-header">
            <div className="header-container">
                <Link to="/" className="logo">
                    PhotoShare
                </Link>

                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">
                        🔍
                    </button>
                </form>

                <div className="header-actions">
                    <button className="notification-btn">
                        🔔
                    </button>
                    {user && (
                        <Link to={`/profile/${user.username}`} className="profile-link">
                            <img
                                src={user.avatar || '/default-avatar.png'}
                                alt="Profile"
                                className="profile-thumbnail"
                            />
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;