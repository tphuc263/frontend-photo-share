import {Route, Routes, Navigate} from 'react-router-dom'
import {AuthProvider} from './context/AuthContext'
import Layout from './components/layout/Layout'
import ProtectedRoute, {PublicRoute} from './utils/ProtectedRoute.jsx'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/home/Home'
import Search from './pages/search/Search'
import Create from './pages/create/Create'
import Profile from './pages/profile/Profile'
import EditProfileForm from './pages/profile/EditProfileForm.jsx'

const ExplorePage = () => (
    <div className="page-placeholder">
        <h2>🧭 Explore Page</h2>
        <p>Discover new content...</p>
    </div>
)

const MessagesPage = () => (
    <div className="page-placeholder">
        <h2>💬 Messages Page</h2>
        <p>Direct messaging feature coming soon...</p>
    </div>
)

const NotificationsPage = () => (
    <div className="page-placeholder">
        <h2>🔔 Notifications Page</h2>
        <p>Stay updated with notifications...</p>
    </div>
)

const ForgotPasswordPage = () => (
    <div className="auth-container">
        <div className="auth-card">
            <div className="auth-header">
                <h1>🔑 Password Reset</h1>
                <p>Reset your password</p>
            </div>
            <div className="page-placeholder">
                <p>Password reset functionality coming soon...</p>
            </div>
        </div>
    </div>
);

const SettingsPage = () => (
    <div className="page-placeholder">
        <h2>⚙️ Settings</h2>
    </div>
);

const HelpPage = () => (
    <div className="page-placeholder">
        <h2>❓ Help & Support</h2>
    </div>
);
const TermsPage = () => (
    <div className="page-placeholder">
        <h2>📄 Terms of Service</h2>
    </div>
);

const PrivacyPage = () => (
    <div className="page-placeholder">
        <h2>🔒 Privacy Policy</h2>
    </div>
);

const NotFoundPage = () => (
    <div className="page-placeholder">
        <h2>❌ Page Not Found</h2>
        <p>The page you're looking for doesn't exist.</p>
    </div>
)

function App() {
    return (
        <AuthProvider>
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace/>} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />

                    <Route element={<PublicRoute />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    </Route>

                    <Route element={<ProtectedRoute />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/explore" element={<ExplorePage />} />
                        <Route path="/messages" element={<MessagesPage />} />
                        <Route path="/notifications" element={<NotificationsPage />} />
                        <Route path="/create" element={<Create />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/profile/:userId" element={<Profile />} />
                        <Route path="/edit-profile" element={<EditProfileForm />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/help" element={<HelpPage />} />
                    </Route>

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Layout>
        </AuthProvider>
    )
}

export default App