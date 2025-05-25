import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

// Component to protect routes that require authentication
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth()
    const location = useLocation()

    // Show loading while checking auth status
    if (loading) {
        return (
            <div className="loading-screen">
                <div>Loading...</div>
            </div>
        )
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        )
    }

    // Render protected content
    return children
}

// Component to redirect authenticated users away from auth pages
export const PublicRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth()

    // Show loading while checking auth status
    if (loading) {
        return (
            <div className="loading-screen">
                <div>Loading...</div>
            </div>
        )
    }

    // Redirect to home if already authenticated
    if (isAuthenticated) {
        return <Navigate to="/" replace />
    }

    // Render public content
    return children
}

export default ProtectedRoute