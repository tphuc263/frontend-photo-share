import { createContext, useContext, useState, useEffect } from 'react'

// Create Auth Context
const AuthContext = createContext()

// Custom hook to use auth contexts
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}

// Auth Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)

    // Initialize auth state from localStorage
    useEffect(() => {
        const savedToken = localStorage.getItem('auth_token')
        const savedUser = localStorage.getItem('auth_user')

        if (savedToken && savedUser) {
            setToken(savedToken)
            setUser(JSON.parse(savedUser))
        }
        setLoading(false)
    }, [])

    // Login function
    const login = async (credentials) => {
        try {
            const response = await fetch('/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Login failed')
            }

            // Store auth data
            localStorage.setItem('auth_token', data.token)
            localStorage.setItem('auth_user', JSON.stringify(data.user))

            setToken(data.token)
            setUser(data.user)

            return { success: true, data }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    // Register function
    const register = async (userData) => {
        try {
            const response = await fetch('/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed')
            }

            return { success: true, data }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    // Logout function
    const logout = () => {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
        setToken(null)
        setUser(null)
    }

    // Check if user is authenticated
    const isAuthenticated = !!token && !!user

    const contextValue = {
        user,
        token,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}