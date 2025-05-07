import type { IClient } from "@/types/Client";
import { SignedClient } from "./SignedClient";
import type { Master } from "@/types/Master";
import { store } from "@/store";

export default class ProxySignedClient extends SignedClient {
    private store = store
    constructor(client: IClient) {
        super(client);
    }

    async likeMaster(master: Master): Promise<boolean> {

        if (await super.likeMaster(master)) {
            this.store.dispatch("likeMaster", master.documentId);
            return true
        };
        return false
    }
}