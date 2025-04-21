import type IStrapiData from "./IStrapiData";

export interface IStrapiMeta {
    [key: string]: any
}

export interface IStrapiResponse {
    data: IStrapiData | null
    meta: IStrapiMeta
}

export interface IStrapiImage extends IStrapiData {
    name: string
    height: number;
    width: number;
    formats: object;
    url: string;
}