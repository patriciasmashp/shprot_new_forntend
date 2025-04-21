import { makeReport, makeRequest } from "@/api";
import type City from "@/types/City";
import type { IClient, TFavorite } from "@/types/Client";
import type { Master } from "@/types/Master";
import type { TypeOfRequest } from "@/types/Request";
import { UserInteract } from "@/types/UserInteract";
import { createDeepLink } from "../functions";

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

    get city(): City {
        return this.client.city
    }

    async shareMaster(master: Master): Promise<void> {
        await navigator.clipboard.writeText(createDeepLink(master.documentId))
        window.Telegram.WebApp.showAlert('Ссылка скопирована в буфер обмена')
    }
}