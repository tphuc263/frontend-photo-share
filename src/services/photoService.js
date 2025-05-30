/**
 * PHOTO SERVICE - API LAYER
 * Purpose: Handle all photo-related API calls
 * Responsibilities:
 * - CRUD operations for photos
 * - Handle newsfeed API calls
 * - Manage photo interactions (like, save)
 * - Return consistent data format
 */

import {api} from './api.js'

/**
 * Get user's newsfeed
 * @param {number} page - Page number
 * @param {number} size - Page size
 * @returns {Promise<Object>} API response with photos page
 */
export async function getNewsfeed(page = 0, size = 20) {
    try {
        return await api.get('/newsfeed', {
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
export async function getRealtimeNewsfeed(page = 0, size = 20) {
    try {
        return await api.get('/newsfeed/realtime', {
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
export async function refreshNewsfeed() {
    try {
        return await api.post('/newsfeed/refresh')
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
export async function getAllPhotos(page = 0, size = 20) {
    try {
        return await api.get('/photos/all', {
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
export async function getUserPhotos(userId, page = 0, size = 20) {
    try {
        return await api.get(`/photos/user/${userId}`, {
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
export async function getPhotoById(photoId) {
    try {
        return await api.get(`/photos/${photoId}`)
    } catch (error) {
        throw new Error(`Failed to load photo: ${error.message}`)
    }
}

/**
 * Create a new photo
 * @param {FormData} photoData - Form data with image and metadata
 * @returns {Promise<Object>} API response with created photo
 */
export async function createPhoto(photoData) {
    try {
        return await api.post('/photos', photoData, {
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
export async function deletePhoto(photoId) {
    try {
        return await api.delete(`/photos/${photoId}`)
    } catch (error) {
        throw new Error(`Failed to delete photo: ${error.message}`)
    }
}

/**
 * Toggle like on a photo
 * @param {string} photoId - Photo ID
 * @returns {Promise<Object>} API response
 */
export async function toggleLike(photoId) {
    try {
        return await api.post(`/likes/photo/${photoId}`)
    } catch (error) {
        throw new Error(`Failed to toggle like: ${error.message}`)
    }
}

/**
 * Get photo likes
 * @param {string} photoId - Photo ID
 * @returns {Promise<Object>} API response with likes array
 */
export async function getPhotoLikes(photoId) {
    try {
        return await api.get(`/likes/photo/${photoId}`)
    } catch (error) {
        throw new Error(`Failed to load likes: ${error.message}`)
    }
}

/**
 * Get photo likes count
 * @param {string} photoId - Photo ID
 * @returns {Promise<Object>} API response with likes count
 */
export async function getPhotoLikesCount(photoId) {
    try {
        return await api.get(`/likes/photo/${photoId}/count`)
    } catch (error) {
        throw new Error(`Failed to load likes count: ${error.message}`)
    }
}