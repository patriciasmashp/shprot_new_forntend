import { createAuction } from "@/api";
import type { Auction, AuctionData } from "@/types/Auction";
import type { City } from "@/types/City";
import type { IClient } from "@/types/Client";

type AuctionBuilderData = {
    [K in keyof AuctionData]?: AuctionData[K];
}

export class AuctionBuilder {
    private auctionData: AuctionBuilderData;
    constructor() {
        this.auctionData = {}
    }
    public setType(type: AuctionData['type']) {
        this.auctionData.type = type;
    }
    public setBodyPart(bodyPart: AuctionData['bodyPart']) {
        this.auctionData.bodyPart = bodyPart;
    }
    public setIdea(idea: AuctionData['idea']) {
        this.auctionData.idea = idea;
    }
    public setPrice(price: AuctionData['price']) {
        this.auctionData.price = price;
    }
    public setFile(file: AuctionData['file']) {
        this.auctionData.file = file;
    }
    public setCity(city: string) {
        this.auctionData.city = city;
    }
    public setSize(size: AuctionData['size']) {
        this.auctionData.size = size;
    }

    public getBodyPart() : AuctionData['bodyPart'] | undefined {
        return this.auctionData.bodyPart;
    }
    public getIdea(): AuctionData['idea'] | undefined {
        return this.auctionData.idea;
    }
    public getCity(): AuctionData['city'] | undefined {
        return this.auctionData.city;
    }
    public getSize(): AuctionData['size'] | undefined {
        return this.auctionData.size;
    }
    public getFile(): AuctionData['file'] | undefined {
        return this.auctionData.file;
    }

    public build(client: IClient): Auction {
        const auction: any = {
            ...this.auctionData,
            client: client,
            masterResponses: []
        }
        return auction;
    }

}

export class AuctionInteractor {

    public static getAuctionBuilder() {
        return new AuctionBuilder();
    }
    public async getActiveAuctions(client: IClient) {

    }



}