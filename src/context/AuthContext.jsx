/**
 * GLOBAL STATE MANAGEMENT LAYER
 * Purpose: Manage global authentication state and provide context
 * Responsibilities:
 * - Maintain global auth state (user, token, loading)
 * - Initialize state from storage on app start
 * - Provide auth context to entire app
 * - Coordinate between business logic and UI components
 * - No direct API calls or storage operations
 */

import {createContext, useContext, useEffect, useState} from 'react'
import {StorageService} from '../utils/storage'
import {useAuth} from '../hooks/useAuth.js'

// Create authentication context
const AuthContext = createContext()

/**
 * Custom hook to use authentication context
 * @returns {Object} Authentication context value
 * @throws {Error} If used outside of AuthProvider
 */
export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}

/**
 * Authentication Provider Component
 * Wraps the entire app to provide auth context
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const AuthProvider = ({children}) => {
    // Global authentication state
    const [user, setUser] = useState(null)           // Current user data
    const [token, setToken] = useState(null)         // JWT token
    const [loading, setLoading] = useState(true)     // Initial loading state

    // Get business logic operations
    const {
        loading: operationLoading,    // Loading state for auth operations
        handleLogin,
        handleRegister,
        handleLogout,
        validateCredentials,
        validateRegistration
    } = useAuth()

    /**
     * Initialize authentication state from storage
     * Runs once when app starts
     */
    useEffect(() => {
        const initializeAuth = () => {
            try {
                // Get stored authentication data
                const {token: savedToken, user: savedUser} = StorageService.getAuthData()

                // If both token and user exist, restore session
                if (savedToken && savedUser) {
                    setToken(savedToken)
                    setUser(savedUser)
                    console.log('Session restored for user:', savedUser.username)
                } else {
                    console.log('No existing session found')
                }
            } catch (error) {
                // Handle initialization errors
                console.error('Failed to initialize auth state:', error)

                // Clear any corrupted data
                StorageService.clearAuthData()
            } finally {
                // Always set loading to false after initialization
                setLoading(false)
            }
        }

        initializeAuth()
    }, []) // Empty dependency array - run only once

    /**
     * Login wrapper that updates global state
     * @param {Object} credentials - User login credentials
     * @returns {Promise<Object>} Login result
     */
    const login = async (credentials) => {
        // Delegate to business logic layer
        const result = await handleLogin(credentials)

        // Update global state on successful login
        if (result.success) {
            setToken(result.token)
            setUser(result.data)
            console.log('User logged in:', result.data.username)
        }

        return result
    }

    /**
     * Register wrapper that delegates to business logic
     * Note: Does not update global state (user must login after registration)
     * @param {Object} userData - User registration data
     * @returns {Promise<Object>} Registration result
     */
    const register = async (userData) => {
        // Delegate to business logic layer
        const result = await handleRegister(userData)

        if (result.success) {
            console.log('User registered successfully')
        }

        return result
    }

    /**
     * Logout wrapper that clears global state
     * @returns {Object} Logout result
     */
    const logout = () => {
        // Delegate to business logic layer
        const result = handleLogout()

        // Clear global state regardless of result
        setToken(null)
        setUser(null)
        console.log('User logged out')

        return result
    }

    /**
     * Check if user is currently authenticated
     * User is authenticated if both token and user data exist
     */
    const isAuthenticated = !!(token && user)

    /**
     * Get current user's role
     * @returns {string|null} User role or null
     */
    const getUserRole = () => {
        return user?.role || null
    }

    /**
     * Check if user has specific role
     * @param {string} role - Role to check
     * @returns {boolean} True if user has the role
     */
    const hasRole = (role) => {
        return user?.role === role
    }

    /**
     * Check if user is admin
     * @returns {boolean} True if user is admin
     */
    const isAdmin = () => {
        return hasRole('ROLE_ADMIN')
    }

    // Context value object - all data and functions available to consumers
    const contextValue = {
        // State
        user,                    // Current user object
        token,                   // JWT token
        loading: loading || operationLoading,  // Combined loading state
        isAuthenticated,         // Boolean authentication status

        // Operations
        login,                   // Login function
        register,                // Registration function
        logout,                  // Logout function

        // Validation utilities
        validateCredentials,     // Credential validation
        validateRegistration,    // Registration validation

        // User utilities
        getUserRole,             // Get user role
        hasRole,                 // Check specific role
        isAdmin                  // Check admin status
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}