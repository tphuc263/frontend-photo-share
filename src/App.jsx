/**
 * MAIN APPLICATION COMPONENT
 * Purpose: Setup app-wide providers and routing
 * Responsibilities:
 * - Wrap app with necessary providers (Auth, Router)
 * - Define application routes
 * - Handle route protection
 * - Provide consistent layout structure
 * - No business logic or direct component logic
 */

import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/layout/Layout'
import ProtectedRoute, { PublicRoute } from './components/auth/ProtectedRoute'

// Import page components
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/Home'

// Import placeholder components for future development
const SearchPage = () => (
    <div className="page-placeholder">
        <h2>🔍 Search Page</h2>
        <p>Search functionality coming soon...</p>
    </div>
)

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

const CreatePage = () => (
    <div className="page-placeholder">
        <h2>➕ Create Post</h2>
        <p>Share your photos and thoughts...</p>
    </div>
)

const ProfilePage = () => (
    <div className="page-placeholder">
        <h2>👤 Profile Page</h2>
        <p>Manage your profile and settings...</p>
    </div>
)

const NotFoundPage = () => (
    <div className="page-placeholder">
        <h2>❌ Page Not Found</h2>
        <p>The page you're looking for doesn't exist.</p>
    </div>
)

/**
 * Main App Component
 * Sets up the entire application structure
 */
function App() {
    return (
        // AuthProvider: Provides authentication context to entire app
        <AuthProvider>
            {/* Layout: Handles responsive layout with sidebar */}
            <Layout>
                {/* Routes: Define all application routes */}
                <Routes>
                    {/* ===================================
                        PUBLIC ROUTES (No auth required)
                        Redirect to home if already authenticated
                        ================================== */}

                    {/* Login Page */}
                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />

                    {/* Registration Page */}
                    <Route
                        path="/register"
                        element={
                            <PublicRoute>
                                <Register />
                            </PublicRoute>
                        }
                    />

                    {/* ===================================
                        PROTECTED ROUTES (Auth required)
                        Redirect to login if not authenticated
                        ================================== */}

                    {/* Home/Dashboard - Main feed */}
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />

                    {/* Search functionality */}
                    <Route
                        path="/search"
                        element={
                            <ProtectedRoute>
                                <SearchPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Explore/Discovery page */}
                    <Route
                        path="/explore"
                        element={
                            <ProtectedRoute>
                                <ExplorePage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Direct messages */}
                    <Route
                        path="/messages"
                        element={
                            <ProtectedRoute>
                                <MessagesPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Notifications center */}
                    <Route
                        path="/notifications"
                        element={
                            <ProtectedRoute>
                                <NotificationsPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Create new post */}
                    <Route
                        path="/create"
                        element={
                            <ProtectedRoute>
                                <CreatePage />
                            </ProtectedRoute>
                        }
                    />

                    {/* User profile */}
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />

                    {/* User profile with ID parameter */}
                    <Route
                        path="/profile/:userId"
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />

                    {/* ===================================
                        PLACEHOLDER ROUTES FOR FUTURE FEATURES
                        ================================== */}

                    {/* Settings page */}
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

                    {/* Help/Support page */}
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

                    {/* Terms of Service */}
                    <Route
                        path="/terms"
                        element={
                            <div className="page-placeholder">
                                <h2>📄 Terms of Service</h2>
                                <p>Legal terms and conditions...</p>
                            </div>
                        }
                    />

                    {/* Privacy Policy */}
                    <Route
                        path="/privacy"
                        element={
                            <div className="page-placeholder">
                                <h2>🔒 Privacy Policy</h2>
                                <p>How we handle your data...</p>
                            </div>
                        }
                    />

                    {/* Forgot Password */}
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

                    {/* ===================================
                        CATCH-ALL ROUTE (404 Not Found)
                        Must be last route
                        ================================== */}
                    <Route
                        path="*"
                        element={<NotFoundPage />}
                    />
                </Routes>
            </Layout>
        </AuthProvider>
    )
}

export default App