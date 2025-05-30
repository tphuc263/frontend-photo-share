import {useAuth} from '../../context/AuthContext'
import SideBar from './SideBar'

const Layout = ({children}) => {
    const {isAuthenticated, loading} = useAuth()

    // Show loading state
    if (loading) {
        return (
            <div className="loading-screen">
                <div>Loading...</div>
            </div>
        )
    }

    // Layout for authenticated users (with sidebar)
    if (isAuthenticated) {
        return (
            <div className="app-layout">
                <SideBar/>
                <main className="main-content">
                    {children}
                </main>
            </div>
        )
    }

    // Layout for unauthenticated users (full width)
    return (
        <div className="auth-layout">
            {children}
        </div>
    )
}

export default Layout