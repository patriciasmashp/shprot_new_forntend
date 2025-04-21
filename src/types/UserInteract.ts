import type City from "./City";
import type { TFavorite } from "./Client";
import type { Master } from "./Master";
import type { TypeOfRequest } from "./Request";

export abstract class UserInteract {

    abstract request(master: Master, type: TypeOfRequest, phone: string): Promise<void>;
    abstract getFavorites(): Array<TFavorite>;
    abstract report(master: Master, text: string, file: File | null ): Promise<void>;
    abstract get city(): City
    abstract is_signed(): boolean
    abstract shareMaster(master: Master): Promise<void>
}

