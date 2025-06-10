import api from '../config/ApiConfig.js'

// export const getPhotoComments = async (photoId) => {
//     try {
//         return await api.get(`/comments/photo/${photoId}`)
//     } catch (error) {
//         throw new Error(`Failed to load comments: ${error.message}`)
//     }
// }
//
// export const getPhotoCommentsCount = async (photoId) => {
//     try {
//         return await api.get(`/comments/photo/${photoId}/count`)
//     } catch (error) {
//         throw new Error(`Failed to load comments count: ${error.message}`)
//     }
// }
//
// export const createComment = async (photoId, commentData) => {
//     try {
//         return await api.post(`/comments/photo/${photoId}`, commentData)
//     } catch (error) {
//         throw new Error(`Failed to create comment: ${error.message}`)
//     }
// }
//
// export const updateComment = async (commentId, commentData) => {
//     try {
//         return await api.put(`/comments/${commentId}`, commentData)
//     } catch (error) {
//         throw new Error(`Failed to update comment: ${error.message}`)
//     }
// }
//
// export const deleteComment = async (commentId) => {
//     try {
//         return await api.delete(`/comments/${commentId}`)
//     } catch (error) {
//         throw new Error(`Failed to delete comment: ${error.message}`)
//     }
// }
//
// export const getComment = async (commentId) => {
//     try {
//         return await api.get(`/comments/${commentId}`)
//     } catch (error) {
//         throw new Error(`Failed to load comment: ${error.message}`)
//     }
// }