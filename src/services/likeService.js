import api from "../config/ApiConfig.js";

// export const like = async (photoId) => {
//     try {
//         return await api.post(`/likes/like/photo/${photoId}`)
//     } catch (error) {
//         throw new Error(`Failed to like: ${error.message}`)
//     }
// }
//
// export const unlike = async (photoId) => {
//     try {
//         return await api.post(`/likes/unlike/photo/${photoId}`)
//     } catch (error) {
//         throw new Error(`Failed to unlike: ${error.message}`)
//     }
// }
//
// export const getPhotoLikes = async (photoId) => {
//     try {
//         return await api.get(`/likes/photo/${photoId}`)
//     } catch (error) {
//         throw new Error(`Failed to load likes: ${error.message}`)
//     }
// }
//
// export const getPhotoLikesCount = async (photoId) => {
//     try {
//         return await api.get(`/likes/photo/${photoId}/count`)
//     } catch (error) {
//         throw new Error(`Failed to load likes count: ${error.message}`)
//     }
// }
