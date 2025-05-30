import {Navigate, useLocation} from 'react-router-dom'
import {useAuth} from '../../../context/AuthContext.jsx'
import {LoadingSpinner} from "../../common/LoadingSpinner.jsx";

// Component to protect routes that require authentication
const ProtectedRoute = ({children}) => {
    const {isAuthenticated, loading} = useAuth()
    const location = useLocation()

    // Show loading while checking auth status
    if (loading) {
        return (
            <LoadingSpinner message="Checking authentication..." size="medium"/>
        )
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                state={{from: location}}
                replace
            />
        )
    }

    // Render protected content
    return children
}

// Component to redirect authenticated users away from auth pages
export const PublicRoute = ({children}) => {
    const {isAuthenticated, loading} = useAuth()

    // Show loading while checking auth status
    if (loading) {
        return (
            <LoadingSpinner message="Checking authentication..." size="medium"/>
        )
    }

    // Redirect to home if already authenticated
    if (isAuthenticated) {
        return <Navigate to="/" replace/>
    }

    // Render public content
    return children
}

export default ProtectedRoute