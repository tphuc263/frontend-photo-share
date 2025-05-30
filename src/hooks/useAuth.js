import {useState} from 'react'
import {loginUser, registerUser} from '../services/authService.js'
import {StorageService} from '../utils/storage'

export const useAuth = () => {
    const [loading, setLoading] = useState(false)

    const handleLogin = async (credentials) => {
        setLoading(true)

        try {
            const apiResponse = await loginUser(credentials)

            const {jwt, id, username, email, role} = apiResponse.data

            const userData = {
                id,
                username,
                email,
                role
            }

            StorageService.setAuthData(jwt, userData)

            return {
                success: true,
                data: userData,
                token: jwt,
                message: 'Login successful'
            }

        } catch (error) {
            console.error('Login operation failed:', error)

            return {
                success: false,
                error: error.message || 'Login failed',
                data: null,
                token: null
            }
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async (userData) => {
        setLoading(true)

        try {
            const apiResponse = await registerUser(userData)

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

    const handleLogout = () => {
        try {
            StorageService.clearAuthData()

            return {
                success: true,
                message: 'Logout successful'
            }

        } catch (error) {
            console.error('Logout operation failed:', error)
        }
    }

    const validateCredentials = (credentials) => {
        const errors = {}

        if (!credentials.email?.trim()) {
            errors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
            errors.email = 'Please enter a valid email address'
        }

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

    const validateRegistration = (userData) => {
        const errors = {}

        if (!userData.username?.trim()) {
            errors.username = 'Username is required'
        } else if (userData.username.length < 3) {
            errors.username = 'Username must be at least 3 characters long'
        } else if (!/^[a-zA-Z0-9._]+$/.test(userData.username)) {
            errors.username = 'Username can only contain letters, numbers, dots and underscores'
        }

        if (!userData.email?.trim()) {
            errors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
            errors.email = 'Please enter a valid email address'
        }

        if (!userData.password) {
            errors.password = 'Password is required'
        } else if (userData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long'
        }

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