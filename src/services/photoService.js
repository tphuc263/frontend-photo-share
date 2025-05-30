import api from '../config/ApiConfig.js'

export async function getNewsfeed(page = 0, size = 20) {
    try {
        return await api.get('/newsfeed', {
            params: { page, size }
        })
    } catch (error) {
        throw new Error(`Failed to load newsfeed: ${error.message}`)
    }
}

export async function getRealtimeNewsfeed(page = 0, size = 20) {
    try {
        return await api.get('/newsfeed/realtime', {
            params: { page, size }
        })
    } catch (error) {
        throw new Error(`Failed to load real-time newsfeed: ${error.message}`)
    }
}

export async function refreshNewsfeed() {
    try {
        return await api.post('/newsfeed/refresh')
    } catch (error) {
        throw new Error(`Failed to refresh newsfeed: ${error.message}`)
    }
}

export async function getAllPhotos(page = 0, size = 20) {
    try {
        return await api.get('/photos/all', {
            params: { page, size }
        })
    } catch (error) {
        throw new Error(`Failed to load photos: ${error.message}`)
    }
}

export async function getUserPhotos(userId, page = 0, size = 20) {
    try {
        return await api.get(`/photos/user/${userId}`, {
            params: { page, size }
        })
    } catch (error) {
        throw new Error(`Failed to load user photos: ${error.message}`)
    }
}

export async function getPhotoById(photoId) {
    try {
        return await api.get(`/photos/${photoId}`)
    } catch (error) {
        throw new Error(`Failed to load photo: ${error.message}`)
    }
}

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

export async function deletePhoto(photoId) {
    try {
        return await api.delete(`/photos/${photoId}`)
    } catch (error) {
        throw new Error(`Failed to delete photo: ${error.message}`)
    }
}

export async function toggleLike(photoId) {
    try {
        return await api.post(`/likes/photo/${photoId}`)
    } catch (error) {
        throw new Error(`Failed to toggle like: ${error.message}`)
    }
}

export async function getPhotoLikes(photoId) {
    try {
        return await api.get(`/likes/photo/${photoId}`)
    } catch (error) {
        throw new Error(`Failed to load likes: ${error.message}`)
    }
}

export async function getPhotoLikesCount(photoId) {
    try {
        return await api.get(`/likes/photo/${photoId}/count`)
    } catch (error) {
        throw new Error(`Failed to load likes count: ${error.message}`)
    }
}

export const photoService = {
    getNewsfeed,
    getRealtimeNewsfeed,
    refreshNewsfeed,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    createPhoto,
    deletePhoto,
    toggleLike,
    getPhotoLikes,
    getPhotoLikesCount
}