export interface IProduct {
    name: string,
    images: Array<string>
    price: number,
    stock: StockType,
    discount: number,
    description: string,
    characteristics: Array<Array<string>>
}

export enum StockType {
    OnOrder,
    InStock
}

export const StockTypeDict = {
    [StockType.OnOrder]: "Под заказ",
    [StockType.InStock]: "В наличии"
}
