import api from '../config/ApiConfig.js'

export const getUserPhotos = async (userId, page = 0, size = 20) => {
    try {
        const response = await api.get(`/photos/user/${userId}`, {
            params: {page, size}
        })
        return response.data.data;
    } catch (error) {
        throw new Error(`Failed to load user photos: ${error.message}`)
    }
}

export const getPhotoById = async (photoId) => {
    try {
        return await api.get(`/photos/${photoId}`)
    } catch (error) {
        throw new Error(`Failed to load photo: ${error.message}`)
    }
}

export const createPhoto = async (photoData) => {
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
//
// export const deletePhoto = async (photoId) => {
//     try {
//         return await api.delete(`/photos/${photoId}`)
//     } catch (error) {
//         throw new Error(`Failed to delete photo: ${error.message}`)
//     }
// }