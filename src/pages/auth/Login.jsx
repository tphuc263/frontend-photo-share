/**
 * LOGIN COMPONENT - UI LAYER
 * Purpose: Handle login form UI and user interactions
 * Responsibilities:
 * - Render login form
 * - Handle form input changes
 * - Manage local form state and validation
 * - Handle form submission
 * - Display errors and loading states
 * - Navigation after successful login
 * - No business logic or API calls
 */

import {useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {useAuthContext} from '../../context/AuthContext'
import {Eye, EyeOff} from 'lucide-react';
import '../../assets/styles/pages/authPage.css'


const Login = () => {
    // Local form state
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    // Local UI state
    const [errors, setErrors] = useState({})        // Form validation errors
    const [showPassword, setShowPassword] = useState(false)  // Password visibility toggle

    // Get auth context and navigation
    const {login, loading, validateCredentials} = useAuthContext()
    const navigate = useNavigate()
    const location = useLocation()

    // Get redirect path from navigation state (used by ProtectedRoute)
    const from = location.state?.from?.pathname || '/'

    /**
     * Handle input field changes
     * @param {Event} e - Input change event
     */
    const handleChange = (e) => {
        const {name, value} = e.target

        // Update form data
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    /**
     * Validate form using business logic validation
     * @returns {boolean} True if form is valid
     */
    const validateForm = () => {
        const validation = validateCredentials(formData)

        if (!validation.isValid) {
            setErrors(validation.errors)
            return false
        }

        // Clear any existing errors
        setErrors({})
        return true
    }

    /**
     * Handle form submission
     * @param {Event} e - Form submit event
     */
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Step 1: Validate form data
        if (!validateForm()) {
            return
        }

        try {
            // Step 2: Attempt login using auth context
            const result = await login(formData)

            // Step 3: Handle login result
            if (result.success) {
                // Login successful - navigate to intended page
                console.log('Login successful, navigating to:', from)
                navigate(from, {replace: true})
            } else {
                // Login failed - show error message
                setErrors({
                    submit: result.error || 'Login failed. Please try again.'
                })
            }
        } catch (error) {
            // Handle unexpected errors
            console.error('Login submission error:', error)
            setErrors({
                submit: 'An unexpected error occurred. Please try again.'
            })
        }
    }

    /**
     * Handle password visibility toggle
     */
    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev)
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                {/* Header Section */}
                <div className="auth-header">
                    <h1>ShareApp</h1>
                    {/* Show success message if redirected from registration */}
                    {location.state?.message && (
                        <div className="success-message">
                            {location.state.message}
                        </div>
                    )}
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="auth-form" noValidate>

                    {/* Email Input Field */}
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`form-input ${errors.email ? 'error' : ''}`}
                            disabled={loading}
                            autoComplete="email"
                            required
                        />
                        {/* Show email validation error */}
                        {errors.email && (
                            <span className="error-message" role="alert">
                                {errors.email}
                            </span>
                        )}
                    </div>

                    {/* Password Input Field */}
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <div className="password-input-wrapper">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`form-input ${errors.password ? 'error' : ''}`}
                                disabled={loading}
                                autoComplete="current-password"
                                required
                            />
                            {/* Password visibility toggle button */}
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={togglePasswordVisibility}
                                disabled={loading}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                            </button>
                        </div>
                        {/* Show password validation error */}
                        {errors.password && (
                            <span className="error-message" role="alert">
                                {errors.password}
                            </span>
                        )}
                    </div>

                    {/* Form submission error */}
                    {errors.submit && (
                        <div className="error-message submit-error" role="alert">
                            {errors.submit}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="submit-btn"
                        aria-describedby={loading ? 'loading-text' : undefined}
                    >
                        {loading ? (
                            <>
                                <span className="loading-spinner">⏳</span>
                                <span id="loading-text">Signing in...</span>
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                {/* Footer Links */}
                <div className="auth-footer">
                    {/* Registration link */}
                    <p>
                        Don't have an account?{' '}
                        <Link
                            to="/register"
                            className="auth-link"
                            tabIndex={loading ? -1 : 0}
                        >
                            Sign up
                        </Link>
                    </p>

                    {/* Forgot password link (placeholder) */}
                    <p>
                        <Link
                            to="/forgot-password"
                            className="auth-link"
                            tabIndex={loading ? -1 : 0}
                        >
                            Forgot your password?
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login