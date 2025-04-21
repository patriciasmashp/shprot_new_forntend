import axios from "axios"
import routes from "./routes"
import { stringify } from 'qs';
import type { Master } from "@/types/Master";
import type IStrapiData from "@/types/IStrapiData";
import type { IStrapiResponse } from "@/types/IStrapiResponse";
import { filter } from "@/store/modules/filters";
import type { IClient, TFavorite } from "@/types/Client";
import type { IRequest, TypeOfRequest } from "@/types/Request";
import type { UserInteract } from "@/types/UserInteract";
import type { SignedClient } from "@/utils/classes/SignedClient";
import type { Report } from "@/types/Report";


export async function getCities() {
    const resp = await axios.get(routes.getCities)
    return resp.data.data
}
export async function getStyles() {
    const params = stringify({
        pagination: {
            pageSize: 100
        }
    })
    const resp = await axios.get(routes.getStyles + "?" + params)
    return resp.data.data
}
export async function getClient(client_id: number) {
    const params = stringify({
        filters: {
            client_id: {
                $eq: client_id
            }
        },

        populate: [
            'favorites_by_date.masters',
            'city',
            'favorites_by_date.masters.profile_image',
            'favorites_by_date.masters.photos',
            'favorites_by_date.masters.city'
        ]

    },
        {
            encodeValuesOnly: true, // prettify URL
        })
    const resp = await axios.get(routes.getClients + "?" + params)
    return resp.data.data[0]
}

export async function updateClient(documentId: string, client_data: SignedClient) {
    const client: IClient = {
        favorites_by_date: client_data.getFavorites().map((fav: TFavorite) => {
            const masters: Array<string> = fav.masters.map((master: Master) => master.documentId)
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

export async function makeRequest(master: Master, client: IClient, type: TypeOfRequest, phone: string) {
    const params = stringify({
        populate: ["master", "client"]
    })
    const request: IRequest = {
        master: master.documentId,
        client: client.documentId,
        TypeOfRequest: type,
        phone: phone
    }
    const data = {
        data: request
    }

    const resp = await axios.post(routes.getRequests + "?" + params, data)
    return resp.data.data[0]
}

export async function makeReport(master: Master, client: IClient, text: str, file: File | null) {

    const params = stringify({
        populate: ["master", "client"]
    })

    const report: Report = {
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