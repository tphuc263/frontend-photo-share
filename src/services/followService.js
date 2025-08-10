import api from '../config/ApiConfig.js'

export const follow = async (targetUserId) => {
    try {
        return await api.post(`/follows/follow/${targetUserId}`)
    } catch (e) {
        throw new Error(`Fail to follow: ${e.message}`)
    }
}

export const unfollow = async (targetUserId) => {
    try {
        return await api.post(`follows/unfollow/${targetUserId}`)
    } catch (e) {
        throw new Error(`Fail to unfollow: ${e.message}`)
    }
}