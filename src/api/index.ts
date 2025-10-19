import axios from "axios"
import routes from "./routes"
import { stringify } from 'qs';
import type { Master } from "@/types/Master";

import type { IStrapiResponse } from "@/types/IStrapiResponse";
import { filter } from "@/store/modules/filters";
import type { IClient, TFavorite } from "@/types/Client";
import type { IRequest, TypeOfRequest } from "@/types/Request";
import type { UserInteract } from "@/types/UserInteract";
import type { SignedClient } from "@/utils/classes/SignedClient";
import type { Report } from "@/types/Report";
import type { City } from "@/types/City";
import type { Style } from "@/types/Style";
import type { Auction, AuctionData } from "@/types/Auction";


export async function getCities(): Promise<City[]> {
    const params = stringify({
        pagination: {
            pageSize: 100
        }
    })
    const resp = await axios.get(routes.getCities + "?" + params)
    return resp.data.data
}
export async function getCityByName(name: string): Promise<City[]> {
    const params = stringify({
        filters: {
            name: {
                $eq: name
            }
        }
    })
    const resp = await axios.get(routes.getCities + "?" + params)
    return resp.data.data
}
export async function getStyles(): Promise<Style[]> {
    const params = stringify({
        pagination: {
            pageSize: 100
        }
    })
    const resp = await axios.get(routes.getStyles + "?" + params)
    return resp.data.data
}
export async function getClient(client_id: number): Promise<IClient> {
    const params = stringify({
        filters: {
            client_id: {
                $eq: client_id
            }
        },

        populate: [
            'favorites_by_date.masters',
            'favorites_by_date.masters.profile_image',
            'favorites_by_date.masters.photos',
            'favorites_by_date.masters.city',
            'city'
        ]

    },
        {
            encodeValuesOnly: true, // prettify URL
        })
    const resp = await axios.get(routes.getClients + "?" + params)
    return resp.data.data[0]
}

export async function updateClient(documentId: string, client_data: SignedClient): Promise<IClient> {
    const client = {
        favorites_by_date: client_data.getFavorites().map((fav: TFavorite) => {
            const masters = fav.masters.map((master: Master | string) => {
                return typeof master === "string" ? master : master.documentId
            })
            return {
                date: fav.date,
                masters: [... new Set(masters)]
            }
        }),
        city: client_data.client.city.documentId,
        client_id: client_data.client.client_id
    }

    const data = {
        data: client
    }
    const resp = await axios.put(routes.getClients + "/" + documentId, data)

    return resp.data.data[0]
}

export async function makeRequest(master: Master, client: IClient, type: TypeOfRequest, contact: string): Promise<IRequest> {
    const params = stringify({
        populate: ["master", "client"]
    })
    const request: any = {
        master: master.documentId,
        client: client.documentId,
        TypeOfRequest: type,
        contact: contact
    }
    const data = {
        data: request
    }

    const resp = await axios.post(routes.getRequests + "?" + params, data)
    return resp.data.data[0]
}

export async function makeReport(master: Master, client: IClient, text: string, file: File | null): Promise<Report> {

    const params = stringify({
        populate: ["master", "client", "files"]
    })

    const report: any = {
        client: client.documentId,
        master: master.documentId,
        text
    }

    const data = {
        data: report
    }
    const resp = await axios.post(routes.getReports + "?" + params, data)
    if (file) {
        const fileData = {

            files: file,
            refId: resp.data.data.id,
            ref: "api::report.report",
            field: "files"
        }

        await axios.postForm(routes.media, fileData)
    }
    return resp.data.data[0]
}

type Progress = {
    progress: {
        loaded: number,
        total?: number,
        success?: boolean
    }
}

export async function uploadVideoToStrapi(file: File, callback: (progress: number) => boolean) {
    const fd = new FormData()
    fd.append('file', file)

    let interval = setInterval(() => {
        setTimeout(async () => {
            var progress = subscribe();

            const final = callback(await progress)
            if (final) {
                clearInterval(interval)
            }

        }, 300);
    }, 400)

    const res = await axios.postForm(routes.uploadVideoWebApp, fd)




    if (res.data.success) {
        return res.data.key
    }
}

function subscribe() {

    const data = axios.get(routes.getUploadStatus)
        .then((r) => {
            if (r.data.progress.total != undefined) {
                console.log(r.data);
                return r.data.progress.loaded / r.data.progress.total * 100
            }
            else {
                return 1
            }

        })
        .catch((r) => {
            console.warn("Network failure. Trying again...");
            return 100
        })
    return data
}

export async function likeMaster(client: IClient, master: Master) {
    const params = stringify({
        populate: ["master", "client"]
    })
    const data = {
        data: {
            master: master.documentId,
            client: client.documentId
        }
    }

    const resp = await axios.post(routes.getLikes + "?" + params, data)
    return resp.data.data[0]
}



export async function createAuction(auctionData: Auction): Promise<Auction> {
    // const params = stringify({
    //     populate: ["client", "city"]
    // })
    const data = { ...auctionData, client: auctionData.client.documentId }
    console.log(data);
    // const formData = new FormData()
    try {
        const response = await axios.postForm(routes.getAuctions + "?", data)

        return response.data.data
    }
    catch (e: any) {
        throw e.response.data.error
        // console.log(e);

        // if ('message' in e.response.data.error) {
        //     return e.response.data.error.message
        // }
        // throw e
    }

}

export async function uploadAuctionFile(auction: Auction, file: File): Promise<Auction> {

    const data = {

        files: file,
        refId: auction.id,
        ref: "api::auction.auction",
        field: "file"

    }
    const responcse = await axios.postForm(routes.media, data)

    return responcse.data.data
}

export async function getActiveAuctions(clientDocumentId: string) {
    console.log(clientDocumentId);

    const params = stringify({
        sort: ['createdAt:desc'],
        populate: ["masterResponses",
            "masterResponses.master",
            "masterResponses.master.profile_image",
            "masterResponses.master.city",
            "file",
            "client",
            "city",
        ],
        filters: {
            $and: [
                {
                    finished: {
                        $eq: false
                    },
                },
                {
                    client: {
                        documentId: {
                            $eq: clientDocumentId
                        }
                    },
                }
            ]
        }
    })
    const response = await axios.get(routes.getAuctions + "?" + params)

    return response.data.data
}
export async function getInactiveAuctions(clientDocumentId: string) {
    const params = stringify({
       sort: ['createdAt:desc'],
        populate: ["masterResponses",
            "masterResponses.master",
            "masterResponses.master.profile_image",
            "masterResponses.master.city",
            "file",
            "client",
            "city",
        ],
        filters: {
            $and: [
                {
                    finished: {
                        $eq: true
                    },
                },
                {
                    client: {
                        documentId: {
                            $eq: clientDocumentId
                        }
                    },
                }
            ]
        }
    })
    const response = await axios.get(routes.getAuctions + "?" + params)

    return response.data.data
}

export async function selectMasterAuction(master: string, auction: string) {
    await axios.post(routes.auctionSentMasterContact, { data: { master: master, auction: auction } })
}

export async function logFrontendError(error: any) {
    await axios.post(routes.frontendError, {data: error})
} 