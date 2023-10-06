export interface IProductDto {
    name: string,
    images: string[],
    price: number,
    stock: StockType,
    discount: number,
    description: string,
    characteristics: string[][],
    subject_id: number,
    brand_id: number
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
