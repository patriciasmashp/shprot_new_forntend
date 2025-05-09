import type City from "./City";
import type IStrapiData from "./IStrapiData";
import type { IStrapiImage } from "./IStrapiResponse";

export interface Master extends IStrapiData {
    master_id: number;
    master_url: string;
    username: string;
    name: string;
    city?: City;
    about_master: string;
    phone_number: string;
    is_notifications_allowed: boolean;
    is_blocked: boolean;
    validated: boolean;
    photos?: Array<IStrapiImage>;
    styles?: Array<object>;
    profile_image?: object ;
    balance: number;
    likes: number;
    aboutRequestCount?: number;
    requestCount?: number;
    shareCount?: number;
    postCount?: number;
    index?: number;
}