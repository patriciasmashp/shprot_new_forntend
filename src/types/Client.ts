import type City from "./City";
import type IStrapiData from "./IStrapiData";
import type { Master } from "./Master";

export type TFavorite = {
    id: number;
    masters: Array<Master | string>;
    date: Date
}

export interface IClient extends IStrapiData{
    client_id: number;
    city: City;
    favorites_by_date: Array<TFavorite>;
}