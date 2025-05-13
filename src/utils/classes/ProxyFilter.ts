import type IFilterData from "@/types/IFilterData";
import { DEFAULT_CITY_NAME } from "../consts";
import Filter from "./Filter";
import { stringify, parse } from 'qs';
import type { UserInteract } from "@/types/UserInteract";
import { store } from "@/store";
export default class ProxyFilter extends Filter {
    private store: any;
    constructor() {
        super()
        this.store = store
    }
    private static instance: ProxyFilter;
    private _client: UserInteract;

    static useFilter() {
        if (!ProxyFilter.instance) {
            ProxyFilter.instance = new ProxyFilter();
            // ProxyFilter.instance._client = ProxyFilter.instance.store.getters.client
        }
        return ProxyFilter.instance;
    }

    build() {
        console.log(this._client);
        
        if (!this.cityName) {

            this.cityName = DEFAULT_CITY_NAME;
        }

        const filter: IFilterData = {
            city: {
                name: { $eq: this.cityName },
            },
            styles: {
                style_name: { $in: this.styleNames },
            },
        }
        this._filter = filter;
        this.isActive = true;
        this.save()
        return stringify(filter);
    }
}