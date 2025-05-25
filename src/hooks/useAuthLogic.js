/**
 * BUSINESS LOGIC LAYER
 * Purpose: Handle authentication business logic and operations
 * Responsibilities:
 * - Orchestrate auth operations (login, register, logout)
 * - Transform API data to app format
 * - Handle operation loading states
 * - Coordinate between API and Storage layers
 * - No UI concerns or global state management
 */

import { useState } from 'react'
import { authService } from '../services/authService'
import { StorageService } from '../utils/storage'

export const useAuthLogic = () => {
    // Local loading state for auth operations
    const [loading, setLoading] = useState(false)

    /**
     * Handle user login operation
     * @param {Object} credentials - Login credentials
     * @param {string} credentials.email - User email
     * @param {string} credentials.password - User password
     * @returns {Promise<Object>} Result object with success/error info
     */
    const handleLogin = async (credentials) => {
        setLoading(true)

        try {
            // Step 1: Call authentication API
            const apiResponse = await authService.login(credentials)

            // Step 2: Extract and transform data from API response
            // Backend returns: { data: { jwt, id, username, email, role }, message }
            const { jwt, id, username, email, role } = apiResponse.data

            // Transform to app's user format
            const userData = {
                id,
                username,
                email,
                role
            }

            // Step 3: Store authentication data in browser
            StorageService.setAuthData(jwt, userData)

            // Step 4: Return success result
            return {
                success: true,
                data: userData,
                token: jwt,
                message: 'Login successful'
            }

        } catch (error) {
            // Log error for debugging
            console.error('Login operation failed:', error)

            // Return error result without exposing internal details
            return {
                success: false,
                error: error.message || 'Login failed',
                data: null,
                token: null
            }
        } finally {
            // Always reset loading state
            setLoading(false)
        }
    }

    /**
     * Handle user registration operation
     * @param {Object} userData - Registration data
     * @param {string} userData.username - Desired username
     * @param {string} userData.email - User email
     * @param {string} userData.password - User password
     * @returns {Promise<Object>} Result object with success/error info
     */
    const handleRegister = async (userData) => {
        setLoading(true)

        try {
            // Step 1: Call registration API
            const apiResponse = await authService.register(userData)

            // Step 2: Registration successful
            // Note: We don't auto-login after registration
            // User needs to login manually for security
            return {
                success: true,
                data: apiResponse,
                message: 'Registration successful'
            }

        } catch (error) {
            console.error('Registration operation failed:', error)

            return {
                success: false,
                error: error.message || 'Registration failed',
                data: null
            }
        } finally {
            setLoading(false)
        }
    }

    /**
     * Handle user logout operation
     * @returns {Object} Result object
     */
    const handleLogout = () => {
        try {
            // Step 1: Clear stored authentication data
            StorageService.clearAuthData()

            // Step 2: Could call backend logout API if needed
            // await authService.logout(token)

            return {
                success: true,
                message: 'Logout successful'
            }

        } catch (error) {
            console.error('Logout operation failed:', error)

            // Even if logout fails, clear local data
            StorageService.clearAuthData()

            return {
                success: true, // Still return success since local data is cleared
                message: 'Logout completed'
            }
        }
    }

    /**
     * Validate authentication credentials
     * @param {Object} credentials - Credentials to validate
     * @returns {Object} Validation result with errors
     */
    const validateCredentials = (credentials) => {
        const errors = {}

        // Email validation
        if (!credentials.email?.trim()) {
            errors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
            errors.email = 'Please enter a valid email address'
        }

        // Password validation
        if (!credentials.password) {
            errors.password = 'Password is required'
        } else if (credentials.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long'
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        }
    }

    /**
     * Validate registration data
     * @param {Object} userData - Registration data to validate
     * @returns {Object} Validation result with errors
     */
    const validateRegistration = (userData) => {
        const errors = {}

        // Username validation
        if (!userData.username?.trim()) {
            errors.username = 'Username is required'
        } else if (userData.username.length < 3) {
            errors.username = 'Username must be at least 3 characters long'
        } else if (!/^[a-zA-Z0-9._]+$/.test(userData.username)) {
            errors.username = 'Username can only contain letters, numbers, dots and underscores'
        }

        // Email validation
        if (!userData.email?.trim()) {
            errors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
            errors.email = 'Please enter a valid email address'
        }

        // Password validation
        if (!userData.password) {
            errors.password = 'Password is required'
        } else if (userData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long'
        }

        // Confirm password validation
        if (!userData.confirmPassword) {
            errors.confirmPassword = 'Please confirm your password'
        } else if (userData.password !== userData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match'
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        }
    }

    // Return all operations and utilities
    return {
        // State
        loading,

        // Operations
        handleLogin,
        handleRegister,
        handleLogout,

        // Validation utilities
        validateCredentials,
        validateRegistration
    }
}