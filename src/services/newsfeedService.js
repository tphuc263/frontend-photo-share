import api from '../config/ApiConfig.js'

export const getNewsfeed = async (page = 0, size = 20) => {
    try {
        const response = await api.get('/newsfeed', {
            params: { page, size }
        })
        return response.data;
    } catch (error) {
        throw new Error(`Failed to load newsfeed: ${error.message}`)
    }
}
//
// export const getRealtimeNewsfeed = async (page = 0, size = 20) => {
//     try {
//         const response = await api.get('/newsfeed/realtime', {
//             params: { page, size }
//         })
//         return response.data;
//     } catch (error) {
//         throw new Error(`Failed to load real-time newsfeed: ${error.message}`)
//     }
// }
//
// export const refreshNewsfeed = async () =>  {
//     try {
//         const response = await api.post('/newsfeed/refresh')
//         return response.data;
//     } catch (error) {
//         throw new Error(`Failed to refresh newsfeed: ${error.message}`)
//     }
// }
