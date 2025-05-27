/**
 * PHOTO SERVICE - API LAYER
 * Purpose: Handle all photo-related API calls
 * Responsibilities:
 * - CRUD operations for photos
 * - Handle newsfeed API calls
 * - Manage photo interactions (like, save)
 * - Return consistent data format
 */

import {apiClient} from './api'

export class PhotoService {
    /**
     * Get user's newsfeed
     * @param {number} page - Page number
     * @param {number} size - Page size
     * @returns {Promise<Object>} API response with photos page
     */
    async getNewsfeed(page = 0, size = 20) {
        try {
            return await apiClient.get('/newsfeed', {
                params: {page, size}
            })
        } catch (error) {
            throw new Error(`Failed to load newsfeed: ${error.message}`)
        }
    }

    /**
     * Get real-time newsfeed (bypass cache)
     * @param {number} page - Page number
     * @param {number} size - Page size
     * @returns {Promise<Object>} API response with photos page
     */
    async getRealtimeNewsfeed(page = 0, size = 20) {
        try {
            return await apiClient.get('/newsfeed/realtime', {
                params: {page, size}
            })
        } catch (error) {
            throw new Error(`Failed to load real-time newsfeed: ${error.message}`)
        }
    }

    /**
     * Refresh newsfeed cache
     * @returns {Promise<Object>} API response
     */
    async refreshNewsfeed() {
        try {
            return await apiClient.post('/newsfeed/refresh')
        } catch (error) {
            throw new Error(`Failed to refresh newsfeed: ${error.message}`)
        }
    }

    /**
     * Get all photos with pagination
     * @param {number} page - Page number
     * @param {number} size - Page size
     * @returns {Promise<Object>} API response with photos page
     */
    async getAllPhotos(page = 0, size = 20) {
        try {
            return await apiClient.get('/photos/all', {
                params: {page, size}
            })
        } catch (error) {
            throw new Error(`Failed to load photos: ${error.message}`)
        }
    }

    /**
     * Get photos by user ID
     * @param {string} userId - User ID
     * @param {number} page - Page number
     * @param {number} size - Page size
     * @returns {Promise<Object>} API response with user's photos
     */
    async getUserPhotos(userId, page = 0, size = 20) {
        try {
            return await apiClient.get(`/photos/user/${userId}`, {
                params: {page, size}
            })
        } catch (error) {
            throw new Error(`Failed to load user photos: ${error.message}`)
        }
    }

    /**
     * Get photo details by ID
     * @param {string} photoId - Photo ID
     * @returns {Promise<Object>} API response with photo details
     */
    async getPhotoById(photoId) {
        try {
            return await apiClient.get(`/photos/${photoId}`)
        } catch (error) {
            throw new Error(`Failed to load photo: ${error.message}`)
        }
    }

    /**
     * Create a new photo
     * @param {FormData} photoData - Form data with image and metadata
     * @returns {Promise<Object>} API response with created photo
     */
    async createPhoto(photoData) {
        try {
            return await apiClient.post('/photos', photoData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        } catch (error) {
            throw new Error(`Failed to create photo: ${error.message}`)
        }
    }

    /**
     * Delete a photo
     * @param {string} photoId - Photo ID
     * @returns {Promise<Object>} API response
     */
    async deletePhoto(photoId) {
        try {
            return await apiClient.delete(`/photos/${photoId}`)
        } catch (error) {
            throw new Error(`Failed to delete photo: ${error.message}`)
        }
    }

    /**
     * Toggle like on a photo
     * @param {string} photoId - Photo ID
     * @returns {Promise<Object>} API response
     */
    async toggleLike(photoId) {
        try {
            return await apiClient.post(`/likes/photo/${photoId}`)
        } catch (error) {
            throw new Error(`Failed to toggle like: ${error.message}`)
        }
    }

    /**
     * Get photo likes
     * @param {string} photoId - Photo ID
     * @returns {Promise<Object>} API response with likes array
     */
    async getPhotoLikes(photoId) {
        try {
            return await apiClient.get(`/likes/photo/${photoId}`)
        } catch (error) {
            throw new Error(`Failed to load likes: ${error.message}`)
        }
    }

    /**
     * Get photo likes count
     * @param {string} photoId - Photo ID
     * @returns {Promise<Object>} API response with likes count
     */
    async getPhotoLikesCount(photoId) {
        try {
            return await apiClient.get(`/likes/photo/${photoId}/count`)
        } catch (error) {
            throw new Error(`Failed to load likes count: ${error.message}`)
        }
    }
}

// Export singleton instance
export const photoService = new PhotoService()