export interface IProductDto {
    name: string,
    images: string[] | null,
    price: number,
    stock: StockType,
    discount: number,
    description: string,
    characteristics: string[][],
    subject: number,
    brand: number,
    currency: number
}

export interface IProduct extends IProductDto {
  id: number,
}

export enum StockType {
    OnOrder,
    InStock
}

export const StockTypeDict = {
    [StockType.OnOrder]: "Под заказ",
    [StockType.InStock]: "В наличии"
}
