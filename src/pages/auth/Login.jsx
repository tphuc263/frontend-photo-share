import {useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {useAuthContext} from '../../context/AuthContext'
import {Eye, EyeOff} from 'lucide-react';
import {validateCredentials} from "../../utils/helpers.js";
import {Loader} from "../../components/common/Loader.jsx";
import '../../assets/styles/pages/authPage.css'


const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)

    const { login, operationLoading: loading } = useAuthContext();
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || '/'

    const handleChange = (e) => {
        const {name, value} = e.target

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const validationResult = validateCredentials(formData)
        setErrors(validationResult.errors)

        if (!validationResult.isValid) {
            return
        }

        try {
            const result = await login(formData)
            console.log("Login result from AuthContext:", result); 

            if (result.success) {
                console.log('Login successful, navigating to:', from)
                navigate(from, {replace: true})
            } else {
                setErrors({
                    submit: result?.error || 'Login failed. Please try again.'
                })
            }
        } catch (error) {
            console.error('Login submission error:', error)
            setErrors({
                submit: 'An unexpected error occurred. Please try again.'
            })
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev)
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                {/* Header Section */}
                <div className="auth-header">
                    <h1>ShareApp</h1>
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
                    >
                        {loading ? (
                            <Loader active={loading} />
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