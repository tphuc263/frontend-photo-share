import axios from 'axios'
import { StorageService } from '../utils/storage.js'

const API_BASE = 'http://localhost:8080/api/v1'

const api = axios.create({
    baseURL: API_BASE,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(
    (config) => {
        const token = StorageService.getToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => {
        return {
            success: true,
            data: response.data
        }
    },
    (error) => {
        if (error.response?.status === 401) {
            StorageService.clearAuthData()
            window.location.href = '/login'
            return Promise.reject(new Error('Session expired'))
        }

        // Handle other errors
        const message = error.response?.data?.message || error.message || 'Network error'
        return Promise.reject(new Error(message))
    }
)

export default api