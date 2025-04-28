type cityEq = {
    $eq: string | null;
}

type cityFilter = {
    name: cityEq;
}

type styleIn = {
    $in: Array<string>;
}
type styleFilter = {
    style_name: styleIn,
}
export default interface IFilterData {
    city: cityFilter,
    styles: styleFilter,
}