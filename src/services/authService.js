import api from '../config/ApiConfig.js'

export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials)
        return response.data
    } catch (error) {
        console.error('Login failed:', error.response?.data || error.message)
        throw error
    }
}

export const registerUser = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData)
        return response.data
    } catch (error) {
        console.error('Register failed:', error.response?.data || error.message)
        throw error
    }
}