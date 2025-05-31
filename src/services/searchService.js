import api from '../config/ApiConfig.js'

export async function searchUsers(query, page = 0, size = 20) {
    try {
        return await api.get('/search/users', {
            params: { q: query, page, size }
        })
    } catch (error) {
        throw new Error(`Failed to search users: ${error.message}`)
    }
}

export async function searchAll(query, type = 'all', page = 0, size = 20) {
    try {
        return await api.get('/search', {
            params: { q: query, type, page, size }
        })
    } catch (error) {
        throw new Error(`Failed to search: ${error.message}`)
    }
}

export const searchService = {
    searchUsers,
    searchAll
}