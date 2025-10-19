import type { Auction } from "./Auction";
import type { City } from "./City";
import type { IStrapiData } from "./IStrapiData";
import type { Master } from "./Master";

export type TFavorite = {
    id: number;
    masters: Array<Master | string>;
    date: Date
}

export type IClient = IStrapiData & {
    client_id: number;
    username: string;
    city: City;
    favorites_by_date: Array<TFavorite>;
    auctions: Array<Auction>;
    banned: boolean;
}