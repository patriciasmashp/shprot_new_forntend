import type { AuctionBuilder } from "@/utils/classes/AuctionInteractor";
import type { Auction, AuctionData, CreateAuctionResponse } from "./Auction";
import type { City } from "./City";
import type { IClient, TFavorite } from "./Client";
import type { Master } from "./Master";
import type { TypeOfRequest } from "./Request";

export abstract class UserInteract {
    public client?: IClient | undefined
    abstract request(master: Master, type: TypeOfRequest, phone: string): Promise<void>;
    abstract getFavorites(): Array<TFavorite>;
    abstract report(master: Master, text: string, file: File | null): Promise<void>;
    abstract get city(): City
    abstract is_signed(): boolean
    abstract shareMaster(master: Master): Promise<void>
    abstract save(): Promise<boolean>
    abstract likeMaster(master: Master): Promise<boolean>
    abstract saveCity(city: City): Promise<boolean>
    abstract createAuction(auctionData: AuctionBuilder): Promise<CreateAuctionResponse>
    abstract getActiveAuctions(): Promise<Auction[]>
    abstract getInactiveAuctions(): Promise<Auction[]>
    abstract selectMasterAuction(masterDocumentId: string, auctionId: string): Promise<void>
    abstract isBanned(): boolean
}

