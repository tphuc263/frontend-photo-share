import api from "../config/ApiConfig.js";

export const getCurrentUserProfile = async () => {
    try {
        const response = await api.get("/users/me");
        return response.data.data;
    } catch (e) {
        throw new Error(`Fail to get current user profile: ${e.message}`)
    }
}

export const getUserProfileById = async (userId) => {
    try {
        const response = await api.get(`/users/${userId}`);
        return response.data.data;
    } catch (e) {
        throw new Error(`Fail to get user profile by id: ${e.message}`)
    }
}