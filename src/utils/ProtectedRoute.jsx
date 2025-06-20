import {Navigate, useLocation, Outlet} from 'react-router-dom'
import {useAuthContext} from '../context/AuthContext.jsx'
import {LoadingSpinner} from "../components/common/LoadingSpinner.jsx";

const ProtectedRoute = () => {
    const {isAuthenticated, loading} = useAuthContext()
    const location = useLocation()

    if (loading) {
        return <LoadingSpinner message="Checking authentication..." size="medium"/>;
    }

    return isAuthenticated
        ? <Outlet />
        : <Navigate to="/login" state={{ from: location }} replace />;
}

export const PublicRoute = () => {
    const {isAuthenticated, loading} = useAuthContext()

    if (loading) {
        return <LoadingSpinner message="Checking authentication..." size="medium" />;
    }

    return isAuthenticated
        ? <Navigate to="/home" replace />
        : <Outlet />;
}

export default ProtectedRoute