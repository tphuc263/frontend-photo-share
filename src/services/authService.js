// services/authService.js
const API_BASE = 'http://localhost:8080/api/v1'

export const loginUser = async (credentials) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials),
    })

    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.message || `HTTP Error: ${response.status}`)
    }
    return data
}

export const registerUser = async (userData) => {
    const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData),
    })

    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.message || `HTTP Error: ${response.status}`)
    }
    return data
}