import { getCities, makeReport, makeRequest } from "@/api";
import type { City } from "@/types/City";
import type { IClient, TFavorite } from "@/types/Client";
import type { Master } from "@/types/Master";
import type { TypeOfRequest } from "@/types/Request";
import { UserInteract } from "@/types/UserInteract";
import { DEFAULT_CITY_NAME } from "../consts";
import type { Auction, AuctionData, CreateAuctionResponse } from "@/types/Auction";
import type { AuctionBuilder } from "./AuctionInteractor";
import { AxiosError } from "axios";

export class UnsignedClient extends UserInteract {


    private _city?: City;

    async init() {
        const cities = await getCities()
        const city = cities.find((city) => city.name == DEFAULT_CITY_NAME)
        if (!city) {
            throw new Error("City not found")
        }
        this._city = city
    }

    is_signed(): boolean {
        return false
    }
    async request(master: Master, type: TypeOfRequest, phone: string): Promise<void> {
        return
    }

    getFavorites(): Array<TFavorite> {
        return []
    }

    async report(master: Master, text: string, file: File | null = null): Promise<void> {
        return
    }


    public get city(): City {
        if (!this._city) {
            throw new Error("City not found")
        }
        return this._city
    }

    async shareMaster(master: Master): Promise<void> {

        await navigator.clipboard.writeText(master.documentId)
    }

    async save(): Promise<boolean> {
        return false
    }

    async likeMaster(master: Master): Promise<boolean> {
        return false
    }

    async saveCity(city: City): Promise<boolean> {
        return true
    }

    async createAuction(auctionBuilder: AuctionBuilder): Promise<CreateAuctionResponse> {
        throw new Error("Method not implemented.")
    }

    async getActiveAuctions(): Promise<Auction[]> {
        return []
    }

    async getInactiveAuctions(): Promise<Auction[]> {
        return []
    }
    async selectMasterAuction(masterDocumentId: string, auctionId: string): Promise<void> {
        return
    }
    isBanned(): boolean {
        return false
    }
}