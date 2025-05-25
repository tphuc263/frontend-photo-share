/**
 * API SERVICE LAYER
 * Purpose: Handle all HTTP requests related to authentication
 * Responsibilities:
 * - Make API calls to backend
 * - Handle HTTP errors
 * - Return raw response data
 * - No state management or business logic
 */

export class AuthService {
    /**
     * Initialize service with base URL
     * @param {string} baseUrl - Backend API base URL
     */
    constructor(baseUrl = 'http://localhost:8080/api/v1') {
        this.baseUrl = baseUrl
    }

    /**
     * Send login request to backend
     * @param {Object} credentials - User login credentials
     * @param {string} credentials.email - User email
     * @param {string} credentials.password - User password
     * @returns {Promise<Object>} API response with user data and JWT
     * @throws {Error} When login fails
     */
    async login(credentials) {
        try {
            const response = await fetch(`${this.baseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            })

            // Parse response body
            const data = await response.json()

            // Handle HTTP errors
            if (!response.ok) {
                throw new Error(data.message || `HTTP Error: ${response.status}`)
            }

            return data
        } catch (error) {
            // Re-throw with more context
            throw new Error(`Login failed: ${error.message}`)
        }
    }

    /**
     * Send registration request to backend
     * @param {Object} userData - User registration data
     * @param {string} userData.username - Desired username
     * @param {string} userData.email - User email
     * @param {string} userData.password - User password
     * @returns {Promise<Object>} API response
     * @throws {Error} When registration fails
     */
    async register(userData) {
        try {
            const response = await fetch(`${this.baseUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || `HTTP Error: ${response.status}`)
            }

            return data
        } catch (error) {
            throw new Error(`Registration failed: ${error.message}`)
        }
    }

    /**
     * Send logout request to backend (if needed in future)
     * Currently just a placeholder for potential server-side logout
     * @param {string} token - JWT token to invalidate
     * @returns {Promise<Object>} API response
     */
    async logout(token) {
        // TODO: Implement server-side logout if needed
        // For now, client-side logout is sufficient
        return { success: true }
    }
}

// Export singleton instance for app-wide use
export const authService = new AuthService()