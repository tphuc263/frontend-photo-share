import api from '../config/ApiConfig.js'

export const getNewsfeed = async (page = 0, size = 20) => {
    try {
        const response = await api.get('/newsfeed', {
            params: {page, size}
        })
        return response.data;
    } catch (error) {
        throw new Error(`Failed to load newsfeed: ${error.message}`)
    }
}