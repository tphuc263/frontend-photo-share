import api from '../config/ApiConfig.js'

export async function getPhotoComments(photoId) {
    try {
        return await api.get(`/comments/photo/${photoId}`)
    } catch (error) {
        throw new Error(`Failed to load comments: ${error.message}`)
    }
}

export async function getPhotoCommentsCount(photoId) {
    try {
        return await api.get(`/comments/photo/${photoId}/count`)
    } catch (error) {
        throw new Error(`Failed to load comments count: ${error.message}`)
    }
}

export async function createComment(photoId, commentData) {
    try {
        return await api.post(`/comments/photo/${photoId}`, commentData)
    } catch (error) {
        throw new Error(`Failed to create comment: ${error.message}`)
    }
}

export async function updateComment(commentId, commentData) {
    try {
        return await api.put(`/comments/${commentId}`, commentData)
    } catch (error) {
        throw new Error(`Failed to update comment: ${error.message}`)
    }
}

export async function deleteComment(commentId) {
    try {
        return await api.delete(`/comments/${commentId}`)
    } catch (error) {
        throw new Error(`Failed to delete comment: ${error.message}`)
    }
}

export async function getComment(commentId) {
    try {
        return await api.get(`/comments/${commentId}`)
    } catch (error) {
        throw new Error(`Failed to load comment: ${error.message}`)
    }
}

export const commentService = {
    getPhotoComments,
    getPhotoCommentsCount,
    createComment,
    updateComment,
    deleteComment,
    getComment
}