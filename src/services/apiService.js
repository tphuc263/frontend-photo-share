/**
 * CENTRALIZED API CLIENT
 * Purpose: Handle all HTTP requests with consistent configuration
 * Responsibilities:
 * - Set base URL and default headers
 * - Handle authentication tokens
 * - Intercept requests/responses
 * - Handle errors consistently
 * - No business logic or state management
 */

import { StorageService } from '../utils/storage'

export class ApiClient {
    constructor(baseUrl = 'http://localhost:8080/api/v1') {
        this.baseUrl = baseUrl
    }

    /**
     * Get default headers including auth token
     * @returns {Object} Headers object
     */
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json'
        }

        // Add auth token if available
        const token = StorageService.getToken()
        if (token) {
            headers['Authorization'] = `Bearer ${token}`
        }

        return headers
    }

    /**
     * Make HTTP request
     * @param {string} method - HTTP method
     * @param {string} url - Request URL
     * @param {Object} data - Request data
     * @param {Object} options - Additional options
     * @returns {Promise<Object>} Response data
     */
    async request(method, url, data = null, options = {}) {
        try {
            const config = {
                method,
                headers: {
                    ...this.getHeaders(),
                    ...options.headers
                },
                ...options
            }

            // Add data for non-GET requests
            if (data && method !== 'GET') {
                if (config.headers['Content-Type'] === 'application/json') {
                    config.body = JSON.stringify(data)
                } else if (data instanceof FormData) {
                    // Remove Content-Type header for FormData (browser sets it)
                    delete config.headers['Content-Type']
                    config.body = data
                } else {
                    config.body = data
                }
            }

            // Add query params for GET requests
            if (data && method === 'GET') {
                const params = new URLSearchParams(data)
                url = `${url}?${params}`
            }

            const response = await fetch(`${this.baseUrl}${url}`, config)

            // Handle different response types
            let responseData
            const contentType = response.headers.get('content-type')

            if (contentType && contentType.includes('application/json')) {
                responseData = await response.json()
            } else {
                responseData = await response.text()
            }

            // Handle HTTP errors
            if (!response.ok) {
                const errorMessage = responseData?.message ||
                    responseData ||
                    `HTTP Error: ${response.status}`

                // Handle 401 Unauthorized - redirect to login
                if (response.status === 401) {
                    StorageService.clearAuthData()
                    window.location.href = '/login'
                    return
                }

                throw new Error(errorMessage)
            }

            return {
                success: true,
                data: responseData?.data || responseData,
                message: responseData?.message || 'Success',
                status: response.status
            }

        } catch (error) {
            console.error(`API Error (${method} ${url}):`, error)

            return {
                success: false,
                error: error.message,
                data: null
            }
        }
    }

    /**
     * GET request
     * @param {string} url - Request URL
     * @param {Object} options - Additional options
     * @returns {Promise<Object>} Response data
     */
    async get(url, options = {}) {
        const { params, ...restOptions } = options
        return this.request('GET', url, params, restOptions)
    }

    /**
     * POST request
     * @param {string} url - Request URL
     * @param {Object} data - Request data
     * @param {Object} options - Additional options
     * @returns {Promise<Object>} Response data
     */
    async post(url, data, options = {}) {
        return this.request('POST', url, data, options)
    }

    /**
     * PUT request
     * @param {string} url - Request URL
     * @param {Object} data - Request data
     * @param {Object} options - Additional options
     * @returns {Promise<Object>} Response data
     */
    async put(url, data, options = {}) {
        return this.request('PUT', url, data, options)
    }

    /**
     * DELETE request
     * @param {string} url - Request URL
     * @param {Object} options - Additional options
     * @returns {Promise<Object>} Response data
     */
    async delete(url, options = {}) {
        return this.request('DELETE', url, null, options)
    }

    /**
     * PATCH request
     * @param {string} url - Request URL
     * @param {Object} data - Request data
     * @param {Object} options - Additional options
     * @returns {Promise<Object>} Response data
     */
    async patch(url, data, options = {}) {
        return this.request('PATCH', url, data, options)
    }
}

// Export singleton instance
export const apiClient = new ApiClient()