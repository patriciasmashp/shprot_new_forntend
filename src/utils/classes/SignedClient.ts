import { makeReport, makeRequest, updateClient, likeMaster, createAuction, uploadAuctionFile, getActiveAuctions, selectMasterAuction, getInactiveAuctions } from "@/api";
import type { City } from "@/types/City";
import type { IClient, TFavorite } from "@/types/Client";
import type { Master } from "@/types/Master";
import type { TypeOfRequest } from "@/types/Request";
import { UserInteract } from "@/types/UserInteract";
import { copyToClipboard, createDeepLink } from "../functions";
import type { AbstractFilter } from "@/types/AbstractFilter";
import type { Auction, AuctionData, CreateAuctionResponse } from "@/types/Auction";
import type { AuctionBuilder } from "./AuctionInteractor";
import {setUser} from "@sentry/browser";
declare const window: any

export class SignedClient extends UserInteract {

    client: IClient
    constructor(user: IClient) {
        super();
        this.client = user
        setUser({id: this.client.documentId})
    }

    is_signed(): boolean {
        return true
    }
    async request(master: Master, type: TypeOfRequest, phone: string): Promise<void> {
        await makeRequest(master, this.client, type, phone)
    }

    getFavorites(): Array<TFavorite> {
        return this.client.favorites_by_date
    }

    async report(master: Master, text: string, file: File | null = null): Promise<void> {
        await makeReport(master, this.client, text, file)
    }

    get city(): City {
        return this.client.city
    }

    async shareMaster(master: Master): Promise<void> {
        await copyToClipboard(createDeepLink(master.documentId))
        // await navigator.clipboard.writeText()
        window.Telegram.WebApp.showAlert('Ссылка скопирована в буфер обмена')
    }

    async save(): Promise<boolean> {
        const res = await updateClient(this.client.documentId, this)

        return true
    }

    async likeMaster(master: Master): Promise<boolean> {
        try {
            await likeMaster(this.client, master)
            return true
        } catch (e) {
            console.log(e);
            return false
        }
    }

    async saveCity(city: City): Promise<boolean> {
        this.client.city = city
        await this.save()
        return true
    }

    async createAuction(auctionBuilder: AuctionBuilder): Promise<CreateAuctionResponse> {
        const auctionData = auctionBuilder.build(this.client)
        try {

            let auction = await createAuction(auctionData)

            return {
                success: true,
                data: auction,
            }
        }
        catch (e: any) {
            return {
                success: false,
                message: e.message,
            }
        }
    }

    async getActiveAuctions(): Promise<Auction[]> {
        return await getActiveAuctions(this.client.documentId)
    }

    async getInactiveAuctions(): Promise<Auction[]> {
        return await getInactiveAuctions(this.client.documentId)
    }
    async selectMasterAuction(masterDocumentId: string, auctionId: string): Promise<void> {
        await selectMasterAuction(masterDocumentId, auctionId)
    }
    
    isBanned(): boolean {
        return this.client.banned
    }
}