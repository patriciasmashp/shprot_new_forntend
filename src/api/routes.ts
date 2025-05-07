

export const baseUrl = import.meta.env.VITE_API_URL


export default {
    getMasters: baseUrl + "/api/masters",
    getCities: baseUrl + "/api/cities",
    getStyles: baseUrl + "/api/styleses",
    getClients: baseUrl + "/api/clients",
    getRequests: baseUrl + "/api/requests",
    getReports: baseUrl + "/api/reports",
    getLikes: baseUrl + "/api/likes",
    
    media: baseUrl + "/api/upload",

    uploadVideoWebApp: baseUrl + "/api/telegram/handleFile",
    getUploadStatus: baseUrl + "/api/telegram/fileUploadStatus"
}