import { useUser } from '../../context/UserContext';
import { Navigate } from 'react-router-dom';

/**
 * PrivateRoute component to protect routes requiring authentication
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 */
function PrivateRoute({ children }) {
    const { isAuthenticated } = useUser();

    if (!isAuthenticated) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace />;
    }

    // Render children if authenticated
    return children;
}

export default PrivateRoute;