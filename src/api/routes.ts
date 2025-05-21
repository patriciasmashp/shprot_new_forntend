

export const baseUrl = import.meta.env.VITE_API_URL


export default {
    getMasters: baseUrl + "/api/masters",
    getCities: baseUrl + "/api/cities",
    getStyles: baseUrl + "/api/styleses",
    getClients: baseUrl + "/api/clients",
    getRequests: baseUrl + "/api/requests",
    getReports: baseUrl + "/api/reports",
    getLikes: baseUrl + "/api/likes",
    getAuctions: baseUrl + "/api/auctions",
    auctionSentMasterContact: baseUrl + "/api/auctions/notifyMasterSelectedByClient",
    media: baseUrl + "/api/upload",

    uploadVideoWebApp: baseUrl + "/api/telegram/handleFile",
    getUploadStatus: baseUrl + "/api/telegram/fileUploadStatus",

    updateMasterStatistic: (document_id: string) => baseUrl + `/api/masters/${document_id}/statistic`,
}