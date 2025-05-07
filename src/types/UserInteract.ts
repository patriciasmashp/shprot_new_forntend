import type City from "./City";
import type { IClient, TFavorite } from "./Client";
import type { Master } from "./Master";
import type { TypeOfRequest } from "./Request";

export abstract class UserInteract {
    public client?: IClient | null
    abstract request(master: Master, type: TypeOfRequest, phone: string): Promise<void>;
    abstract getFavorites(): Array<TFavorite>;
    abstract report(master: Master, text: string, file: File | null ): Promise<void>;
    abstract get city(): City
    abstract is_signed(): boolean
    abstract shareMaster(master: Master): Promise<void>
    abstract save(): Promise<boolean>
    abstract likeMaster(master: Master): Promise<boolean>
    abstract saveCity(city: City): Promise<boolean>
}

