import {Navigate, useLocation} from 'react-router-dom'
import {useAuthContext} from '../../../context/AuthContext.jsx'
import {LoadingSpinner} from "../../common/LoadingSpinner.jsx";

const ProtectedRoute = ({children}) => {
    const {isAuthenticated, loading} = useAuthContext()
    const location = useLocation()

    if (loading) {
        return (
            <LoadingSpinner message="Checking authentication..." size="medium"/>
        )
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                state={{from: location}}
                replace
            />
        )
    }

    return children
}

export const PublicRoute = ({children}) => {
    const {isAuthenticated, loading} = useAuthContext()

    if (loading) {
        return (
            <LoadingSpinner message="Checking authentication..." size="medium"/>
        )
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace/>
    }

    return children
}

export default ProtectedRoute