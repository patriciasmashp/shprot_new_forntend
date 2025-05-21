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
    public setCity(city: City) {
        this.auctionData.city = city.documentId;
    }
    public setSize(size: AuctionData['size']) {
        this.auctionData.size = size;
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