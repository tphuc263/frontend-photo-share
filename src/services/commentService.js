/**
 * COMMENT SERVICE - API LAYER
 * Purpose: Handle all comment-related API calls
 * Responsibilities:
 * - Create, read, update, delete comments
 * - Handle HTTP requests and responses
 * - Return consistent data format
 * - No business logic or state management
 */

import {api} from './api.js'

/**
 * Get all comments for a photo
 * @param {string} photoId - Photo ID
 * @returns {Promise<Object>} API response with comments array
 */
export async function getPhotoComments(photoId) {
    try {
        return await api.get(`/comments/photo/${photoId}`)
    } catch (error) {
        throw new Error(`Failed to load comments: ${error.message}`)
    }
}

/**
 * Get comments count for a photo
 * @param {string} photoId - Photo ID
 * @returns {Promise<Object>} API response with count
 */
export async function getPhotoCommentsCount(photoId) {
    try {
        return await api.get(`/comments/photo/${photoId}/count`)
    } catch (error) {
        throw new Error(`Failed to load comments count: ${error.message}`)
    }
}

/**
 * Create a new comment
 * @param {string} photoId - Photo ID
 * @param {Object} commentData - Comment data
 * @param {string} commentData.text - Comment text
 * @returns {Promise<Object>} API response with created comment
 */
export async function createComment(photoId, commentData) {
    try {
        return await api.post(`/comments/photo/${photoId}`, commentData)
    } catch (error) {
        throw new Error(`Failed to create comment: ${error.message}`)
    }
}

/**
 * Update an existing comment
 * @param {string} commentId - Comment ID
 * @param {Object} commentData - Updated comment data
 * @param {string} commentData.text - Updated comment text
 * @returns {Promise<Object>} API response with updated comment
 */
export async function updateComment(commentId, commentData) {
    try {
        return await api.put(`/comments/${commentId}`, commentData)
    } catch (error) {
        throw new Error(`Failed to update comment: ${error.message}`)
    }
}

/**
 * Delete a comment
 * @param {string} commentId - Comment ID
 * @returns {Promise<Object>} API response
 */
export async function deleteComment(commentId) {
    try {
        return await api.delete(`/comments/${commentId}`)
    } catch (error) {
        throw new Error(`Failed to delete comment: ${error.message}`)
    }
}

/**
 * Get a specific comment by ID
 * @param {string} commentId - Comment ID
 * @returns {Promise<Object>} API response with comment data
 */
export async function getComment(commentId) {
    try {
        return await api.get(`/comments/${commentId}`)
    } catch (error) {
        throw new Error(`Failed to load comment: ${error.message}`)
    }
}