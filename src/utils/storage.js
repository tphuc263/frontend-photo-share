/**
 * STORAGE SERVICE LAYER
 * Purpose: Handle all browser storage operations
 * Responsibilities:
 * - Store/retrieve auth data from localStorage
 * - Handle storage errors gracefully
 * - Provide consistent storage interface
 * - No business logic or API calls
 */

export class StorageService {
    // Storage keys - centralized for easy changes
    static AUTH_TOKEN_KEY = 'auth_token'
    static AUTH_USER_KEY = 'auth_user'

    /**
     * Store authentication data in localStorage
     * @param {string} token - JWT token
     * @param {Object} user - User data object
     * @param {string} user.id - User ID
     * @param {string} user.username - Username
     * @param {string} user.email - User email
     * @param {string} user.role - User role
     */
    static setAuthData(token, user) {
        try {
            // Store token as string
            localStorage.setItem(this.AUTH_TOKEN_KEY, token)

            // Store user object as JSON string
            localStorage.setItem(this.AUTH_USER_KEY, JSON.stringify(user))

            console.log('Auth data stored successfully')
        } catch (error) {
            // Handle storage quota exceeded or other localStorage errors
            console.error('Failed to store auth data:', error)
            throw new Error('Failed to save login data')
        }
    }

    /**
     * Retrieve authentication data from localStorage
     * @returns {Object} Object containing token and user data
     * @returns {string|null} returns.token - JWT token or null
     * @returns {Object|null} returns.user - User object or null
     */
    static getAuthData() {
        try {
            // Get token from storage
            const token = localStorage.getItem(this.AUTH_TOKEN_KEY)

            // Get and parse user data
            const userJson = localStorage.getItem(this.AUTH_USER_KEY)
            const user = userJson ? JSON.parse(userJson) : null

            // Return both pieces of data
            return { token, user }
        } catch (error) {
            // Handle JSON parse errors or localStorage access issues
            console.error('Failed to retrieve auth data:', error)

            // Clear corrupted data
            this.clearAuthData()

            return { token: null, user: null }
        }
    }

    /**
     * Remove all authentication data from localStorage
     * Used for logout or when data is corrupted
     */
    static clearAuthData() {
        try {
            localStorage.removeItem(this.AUTH_TOKEN_KEY)
            localStorage.removeItem(this.AUTH_USER_KEY)
            console.log('Auth data cleared successfully')
        } catch (error) {
            // Even clearing can fail in some edge cases
            console.error('Failed to clear auth data:', error)
        }
    }

    /**
     * Check if user has stored authentication data
     * @returns {boolean} True if both token and user exist
     */
    static hasAuthData() {
        const { token, user } = this.getAuthData()
        return !!(token && user)
    }

    /**
     * Get only the token (useful for API calls)
     * @returns {string|null} JWT token or null
     */
    static getToken() {
        const { token } = this.getAuthData()
        return token
    }

    /**
     * Get only the user data
     * @returns {Object|null} User object or null
     */
    static getUser() {
        const { user } = this.getAuthData()
        return user
    }
}