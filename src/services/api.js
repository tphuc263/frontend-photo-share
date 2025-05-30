// utils/api.js
import {StorageService} from "../utils/storage.js";

const API_BASE = 'http://localhost:8080/api/v1'

export const api = async (endpoint, options = {}) => {
    const token = StorageService.getToken()

    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && {'Authorization': `Bearer ${token}`}),
            ...options.headers
        },
        ...options
    }

    if (options.body && options.method !== 'GET') {
        config.body = JSON.stringify(options.body)
    }

    const response = await fetch(`${API_BASE}${endpoint}`, config)
    const data = await response.json()

    if (!response.ok) {
        if (response.status === 401) {
            StorageService.clearAuthData()
            window.location.href = '/login'
            return
        }
        throw new Error(data.message || `HTTP Error: ${response.status}`)
    }

    return {success: true, data: data.data || data}
}