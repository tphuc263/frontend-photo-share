import {createContext, useContext, useEffect, useState} from 'react'
import {clearAuthData, getAuthData} from '../utils/storage'
import {useAuth as useAuthLogic} from '../hooks/useAuth.js'

const AuthContext = createContext(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [initLoading, setInitLoading] = useState(true);

    const {
        loading: operationLoading,
        handleLogin,
        handleRegister,
        handleLogout
    } = useAuthLogic()

    useEffect(() => {
        const initializeAuth = () => {
            try {
                const {token: savedToken, user: savedUser} = getAuthData()

                if (savedToken && savedUser) {
                    setToken(savedToken)
                    setUser(savedUser)
                    console.log('Session restored for user:', savedUser.username)
                } else {
                    console.log('No existing session found')
                }
            } catch (error) {
                console.error('Failed to initialize auth state:', error)
                clearAuthData()
            } finally {
                setInitLoading(false);
            }
        }

        initializeAuth()
    }, [])

    const login = async (credentials) => {
        const result = await handleLogin(credentials)

        if (result.success) {
            setToken(result.token)
            setUser(result.data)
            console.log('User logged in:', result.data.username)
        }

        return result
    }

    const register = async (userData) => {
        const result = await handleRegister(userData)

        if (result.success) {
            console.log('User registered successfully')
        }

        return result
    }

    const logout = () => {
        const result = handleLogout()

        setToken(null)
        setUser(null)
        console.log('User logged out')

        return result
    }

    const isAuthenticated = !!(token && user)

    const getUserRole = () => {
        return user?.role || null
    }

    const hasRole = (role) => {
        return user?.role === role
    }

    const isAdmin = () => {
        return hasRole('ROLE_ADMIN')
    }

    const contextValue = {
      // State
      user,
      setUser,
      token,
      loading: initLoading,
      operationLoading: operationLoading,
      isAuthenticated, // Boolean authentication status

      // Operations
      login, // Login function
      register, // Registration function
      logout, // Logout function

      // User utilities
      getUserRole,
      hasRole,
      isAdmin,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}