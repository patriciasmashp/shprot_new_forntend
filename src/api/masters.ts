import axios from "axios"
import routes from "./routes"
import { stringify } from 'qs';
import type { Master } from "@/types/Master";
import type IStrapiData from "@/types/IStrapiData";
import type { IStrapiResponse } from "@/types/IStrapiResponse";
import type { IClient } from "@/types/Client";

export async function getMasters({ page = 1, pageSize = 10, city = "Екатеринбург", filters = {} }) {

    const params = stringify({
        pagination: {
            page: page,
            pageSize: pageSize,
        },
        filters: Object.keys(filters).length !== 0 ? filters : {
            city: {
                name: {
                    $eq: city
                }
            }
        },
        populate: "*"
    })
    const resp = await axios.get(routes.getMasters + "?" + params)
    const data: Array<Master> | null = resp.data.data
    const meta = resp.data.meta
    return resp.data
}

export async function getMaster(id: string) {
    const params = stringify({
        populate: "*"
    })
    const resp = await axios.get(routes.getMasters + "/" + id + "?" + params)
    return resp.data.data
}

export async function updateMaster(master: Master) {
    const data = {
        data: {
            likes: master.likes
        }
    }
    const resp = await axios.put(routes.getMasters + "/" + master.documentId, data)
    return resp.data
}

