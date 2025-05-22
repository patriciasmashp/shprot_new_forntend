import AuctionType from "@/blocks/auction/CreateAuctionStates/AuctionType.vue";
import BodyPartStep from "@/blocks/auction/CreateAuctionStates/BodyPartStep.vue";
import CityStep from "@/blocks/auction/CreateAuctionStates/CityStep.vue";
import IdeaStep from "@/blocks/auction/CreateAuctionStates/IdeaStep.vue";
import SizeStep from "@/blocks/auction/CreateAuctionStates/SizeStep.vue";
import type { Component } from "vue";
import type { City } from "./City";
import type { IClient } from "./Client";
import type { IStrapiData } from "./IStrapiData";
import type { Master } from "./Master";

export type State = {
    [key: string]: any;
};

export enum AuctionTypesEnum {
    sketchAuction = "sketchAuction",
    priceAuction = "priceAuction",
}
export enum AuctionSizesEnum {
    small = "Маленькая",
    medium = "Средняя",
    large = "Большая",
    extraLarge = "Большой проект",
}
export type AuctionData = {
    type: AuctionTypesEnum;
    city: string;
    bodyPart: string;
    size: AuctionSizesEnum;
    idea: string;
    price?: number;
    file?: any[];
}

export type AuctionResponse = {
    master: Master;
    price?: number;
    clientChoice: boolean
    data: AuctionData;
}

export type Auction = IStrapiData & AuctionData & {
    client: IClient;
    finished: boolean;

    masterResponses: Array<AuctionResponse>;
}

export type StateComponents = {
    [key in keyof typeof statuses]: Component;
};
export enum statuses {
    type = "type",
    city = "city",
    bodyPart = "bodyPart",
    size = "size",
    idea = "idea",
}

export const statesComponents: StateComponents = {
    type: AuctionType as Component,
    city: CityStep as Component,
    bodyPart: BodyPartStep as Component,
    size: SizeStep as Component,
    idea: IdeaStep as Component,
};

export type CreateAuctionResponse = {
    success: boolean;
    data?: Auction;
    message?: string;
}