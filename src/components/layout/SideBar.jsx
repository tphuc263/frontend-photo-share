import { NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const SideBar = () => {
    const { user, logout, isAuthenticated } = useAuth()

    // Navigation items for authenticated users
    const navItems = [
        { path: '/', label: 'Home', icon: '🏠' },
        { path: '/search', label: 'Search', icon: '🔍' },
        { path: '/explore', label: 'Explore', icon: '🧭' },
        { path: '/messages', label: 'Messages', icon: '💬' },
        { path: '/notifications', label: 'Notifications', icon: '🔔' },
        { path: '/create', label: 'Create', icon: '➕' },
        { path: '/profile', label: 'Profile', icon: '👤' },
    ]

    // Handle logout
    const handleLogout = () => {
        logout()
    }

    if (!isAuthenticated) {
        return null // Don't show sidebar for unauthenticated users
    }

    return (
        <aside className="sidebar">
            {/* Logo/Brand */}
            <div className="sidebar-brand">
                <h2>ShareApp</h2>
            </div>

            {/* Navigation Links */}
            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `nav-item ${isActive ? 'active' : ''}`
                        }
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-label">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* User Info & Logout */}
            <div className="sidebar-footer">
                <div className="user-info">
                    <span className="user-avatar">👤</span>
                    <span className="username">{user?.username}</span>
                </div>
                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>
            </div>
        </aside>
    )
}

export default SideBar