import type IFilterData from "./IFilterData";

export abstract class AbstractFilter {
    
    public abstract isActive: boolean;
    public abstract _cityName: string | null;
    public abstract styleNames: string[];
    public abstract build(): string;
    public abstract clear(): void;

    public abstract get cityName(): string;
    protected _filter: IFilterData | null = null;

    get filter() {
        return this._filter;
    }
    abstract save(): void
    abstract getFromStorage(): IFilterData | null
}