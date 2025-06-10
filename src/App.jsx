import {Route, Routes} from 'react-router-dom'
import {AuthProvider} from './context/AuthContext'
import Layout from './components/layout/Layout'
import ProtectedRoute, {PublicRoute} from './components/features/auth/ProtectedRoute'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/home/Home'
import Search from './pages/search/Search'
import Create from './pages/create/Create'
import Profile from './pages/profile/Profile'

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
                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <Login/>
                            </PublicRoute>
                        }
                    />

                    <Route
                        path="/register"
                        element={
                            <PublicRoute>
                                <Register/>
                            </PublicRoute>
                        }
                    />

                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Home/>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/search"
                        element={
                            <ProtectedRoute>
                                <Search/>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/explore"
                        element={
                            <ProtectedRoute>
                                <ExplorePage/>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/messages"
                        element={
                            <ProtectedRoute>
                                <MessagesPage/>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/notifications"
                        element={
                            <ProtectedRoute>
                                <NotificationsPage/>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/create"
                        element={
                            <ProtectedRoute>
                                <Create/>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile/>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/profile/:userId"
                        element={
                            <ProtectedRoute>
                                <Profile/>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/settings"
                        element={
                            <ProtectedRoute>
                                <div className="page-placeholder">
                                    <h2>⚙️ Settings</h2>
                                    <p>Account and app settings...</p>
                                </div>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/help"
                        element={
                            <ProtectedRoute>
                                <div className="page-placeholder">
                                    <h2>❓ Help & Support</h2>
                                    <p>Get help and contact support...</p>
                                </div>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/terms"
                        element={
                            <div className="page-placeholder">
                                <h2>📄 Terms of Service</h2>
                                <p>Legal terms and conditions...</p>
                            </div>
                        }
                    />

                    <Route
                        path="/privacy"
                        element={
                            <div className="page-placeholder">
                                <h2>🔒 Privacy Policy</h2>
                                <p>How we handle your data...</p>
                            </div>
                        }
                    />

                    <Route
                        path="/forgot-password"
                        element={
                            <PublicRoute>
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
                            </PublicRoute>
                        }
                    />

                    <Route
                        path="*"
                        element={<NotFoundPage/>}
                    />
                </Routes>
            </Layout>
        </AuthProvider>
    )
}

export default App