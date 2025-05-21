import type { IClient } from "./Client";
import type { IStrapiData } from "./IStrapiData";

import type { Master } from "./Master";

export type Report = IStrapiData & {
    text: string,
    file?: File,
    master: Master | string,
    client: IClient | string,

}
