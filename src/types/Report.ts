import type { IClient } from "./Client";
import type IStrapiData from "./IStrapiData";
import type { Master } from "./Master";

export interface Report extends IStrapiData {
    text: string
    file?: File 
    master: Master | string
    client: IClient | string
}