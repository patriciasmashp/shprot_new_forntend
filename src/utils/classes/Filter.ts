
import { AbstractFilter } from "@/types/AbstractFilter";
import type IFilterData from "@/types/IFilterData";
import { stringify, parse } from 'qs';
import { useCloudStorage } from 'vue-tg'

const cloudStorage = useCloudStorage()
declare const window: any;

export default class Filter extends AbstractFilter {
    private static instance: Filter;
    static useFilter() {
        if (!Filter.instance) {
            Filter.instance = new Filter();
        }
        return Filter.instance;
    }

    public isActive: boolean = false;
    public cityName: string | null = null;
    public styleNames: string[] = [];


    constructor() {
        super()
    }

    get filter() {
        return this._filter;
    }

    build() {
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
    clear() {
        this.cityName = null;
        this.styleNames = [];
        this._filter = null;
        this.isActive = false;
    }
    save() {
            localStorage.setItem("filter", stringify(this.filter));
    }
    getFromStorage(): IFilterData | null {
            const filterStr = localStorage.getItem("filter");
            if (!filterStr) return null
            const filter = parse(filterStr) as any
            return filter as IFilterData

    }
}