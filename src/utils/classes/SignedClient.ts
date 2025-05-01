import { makeReport, makeRequest, updateClient } from "@/api";
import type City from "@/types/City";
import type { IClient, TFavorite } from "@/types/Client";
import type { Master } from "@/types/Master";
import type { TypeOfRequest } from "@/types/Request";
import { UserInteract } from "@/types/UserInteract";
import { copyToClipboard, createDeepLink } from "../functions";

declare const window: any

export class SignedClient extends UserInteract {

    client: IClient
    constructor(user: IClient) {
        super();
        this.client = user
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

    get city(): City{
        return this.client.city
    }

    async shareMaster(master: Master): Promise<void> {
        await copyToClipboard(createDeepLink(master.documentId))
        // await navigator.clipboard.writeText()
        window.Telegram.WebApp.showAlert('Ссылка скопирована в буфер обмена')
    }

    async save(): Promise<boolean> {
        const res = await updateClient(this.client.documentId, this)
        console.log(res);
        
        return true
    }
}