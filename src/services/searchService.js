import api from '../config/ApiConfig.js'

export const searchUsers = async (query, page = 0, size = 20) => {
    try {
        const response = await api.get('/search/users', {
            params: {q: query, page, size}
        })
        return response.data
    } catch (error) {
        throw new Error(`Failed to search users: ${error.message}`)
    }
}