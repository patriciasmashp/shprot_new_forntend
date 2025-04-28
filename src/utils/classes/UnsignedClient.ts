import { getCities, makeReport, makeRequest } from "@/api";
import type City from "@/types/City";
import type { IClient, TFavorite } from "@/types/Client";
import type { Master } from "@/types/Master";
import type { TypeOfRequest } from "@/types/Request";
import { UserInteract } from "@/types/UserInteract";

export class UnsignedClient extends UserInteract {

    private _client: IClient | any;
    private _city?: City;

    async init() {
        const cities = await getCities()
        this._city = cities[0]
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

    public get client(): object {
        return {}
    }

    public get city(): City {
        return this._city
    }

    async shareMaster(master: Master): Promise<void> {
        await navigator.clipboard.writeText(master.documentId)
    }
}