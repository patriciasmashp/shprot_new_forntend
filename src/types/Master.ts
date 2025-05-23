import type { City } from "./City";
import type { IStrapiData } from "./IStrapiData";
import type { IStrapiImage } from "./IStrapiResponse";

export type Master = IStrapiData & {
    master_id: number;
    master_url: string;
    username: string;
    name: string;
    city: City;
    about_master: string;
    phone_number: string;
    is_notifications_allowed: boolean;
    is_blocked: boolean;
    validated: boolean;
    photos?: Array<IStrapiImage>;
    styles?: Array<any>;
    profile_image?: any;
    balance: number;
    likes: number;
    aboutRequestCount?: number;
    requestCount?: number;
    shareCount?: number;
    postCount?: number;
    index?: number;
}