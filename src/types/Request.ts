import type { IClient } from "./Client"
import type { Master } from "./Master"

export enum TypeOfRequest {
    phone = "Звонок",
    WhatsUp = "WhatsApp",
    telegram = "Telegram"
}


export interface IRequest  {
    master: Master | string
    client: IClient | string
    TypeOfRequest: TypeOfRequest
    phone: string
}