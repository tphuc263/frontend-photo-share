import api from '../config/ApiConfig.js'

export const follow = async (targetUserId) => {
    try {
        return await api.post(`/follows/follow/${targetUserId}}`)
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

// export const getFollowersOfUser = async (userId) => {
//     try {
//         return await api.get(`follows/${userId}/followers`)
//     } catch (e) {
//         throw new Error(`Fail to get followers of cur User: ${e.message}`)
//     }
// }
//
// export const getFollowingOfUser = async (userId) => {
//     try {
//         return await api.post(`follows/${userId}/following`)
//     } catch (e) {
//         throw new Error(`Fail to get following of cur User: ${e.message}`)
//     }
// }
