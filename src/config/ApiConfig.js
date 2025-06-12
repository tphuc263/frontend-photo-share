import axios from 'axios'
import {clearAuthData, getToken} from '../utils/storage.js'
import {API_BASE_URL} from "../utils/constants.js";

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(
    (config) => {
        const token = getToken()
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
            clearAuthData()
            window.location.href = '/login'
            return Promise.reject(new Error('Session expired'))
        }

        const message = error.response?.data?.message || error.message || 'Network error'
        return Promise.reject(new Error(message))
    }
)

export default api