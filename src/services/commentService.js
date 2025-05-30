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

export class CommentService {
    /**
     * Get all comments for a photo
     * @param {string} photoId - Photo ID
     * @returns {Promise<Object>} API response with comments array
     */
    async getPhotoComments(photoId) {
        try {
            const response = await api.get(`/comments/photo/${photoId}`)
            return response
        } catch (error) {
            throw new Error(`Failed to load comments: ${error.message}`)
        }
    }

    /**
     * Get comments count for a photo
     * @param {string} photoId - Photo ID
     * @returns {Promise<Object>} API response with count
     */
    async getPhotoCommentsCount(photoId) {
        try {
            const response = await api.get(`/comments/photo/${photoId}/count`)
            return response
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
    async createComment(photoId, commentData) {
        try {
            const response = await api.post(`/comments/photo/${photoId}`, commentData)
            return response
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
    async updateComment(commentId, commentData) {
        try {
            const response = await api.put(`/comments/${commentId}`, commentData)
            return response
        } catch (error) {
            throw new Error(`Failed to update comment: ${error.message}`)
        }
    }

    /**
     * Delete a comment
     * @param {string} commentId - Comment ID
     * @returns {Promise<Object>} API response
     */
    async deleteComment(commentId) {
        try {
            const response = await api.delete(`/comments/${commentId}`)
            return response
        } catch (error) {
            throw new Error(`Failed to delete comment: ${error.message}`)
        }
    }

    /**
     * Get a specific comment by ID
     * @param {string} commentId - Comment ID
     * @returns {Promise<Object>} API response with comment data
     */
    async getComment(commentId) {
        try {
            const response = await api.get(`/comments/${commentId}`)
            return response
        } catch (error) {
            throw new Error(`Failed to load comment: ${error.message}`)
        }
    }
}

// Export singleton instance
export const commentService = new CommentService()