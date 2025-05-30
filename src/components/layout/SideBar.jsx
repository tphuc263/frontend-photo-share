import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
    Home,
    Search,
    Compass,
    MessageCircle,
    Heart,
    PlusSquare,
    User
} from 'lucide-react'

const SideBar = () => {
    const { user, logout, isAuthenticated } = useAuth()

    // Navigation items for authenticated users
    const navItems = [
        { path: '/', label: 'Home', icon: <Home size={20} /> },
        { path: '/search', label: 'Search', icon: <Search size={20} /> },
        { path: '/explore', label: 'Explore', icon: <Compass size={20} /> },
        { path: '/messages', label: 'Messages', icon: <MessageCircle size={20} /> },
        { path: '/notifications', label: 'Notifications', icon: <Heart size={20} /> },
        { path: '/create', label: 'Create', icon: <PlusSquare size={20} /> },
        { path: '/profile', label: 'Profile', icon: <User size={20} /> },
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