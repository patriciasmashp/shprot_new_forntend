import type IFilterData from "./IFilterData";

export abstract class AbstractFilter {
    
    public abstract isActive: boolean;
    public abstract cityName: string | null;
    public abstract styleNames: string[];
    public abstract build(): string;
    public abstract clear(): void;

    protected _filter: IFilterData | null = null;

    get filter() {
        return this._filter;
    }
    abstract save(): void
    abstract getFromStorage(): IFilterData | null
}