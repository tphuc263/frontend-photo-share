import {useAuthContext} from '../../context/AuthContext'
import SideBar from './SideBar'
import {Loader} from '../common/Loader.jsx'

const Layout = ({children}) => {
    const {isAuthenticated, loading} = useAuthContext()

    // Show loading state
    if (loading) {
        return <Loader />
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