import { IProduct } from "../types/product";
import { useHttpGet } from "./base";

export type GetAllRequest = {
    offset: number,
    limit: number,
    subject?: number,
    brand?: number,
}

const BASE_URL = "http://localhost:8000";

const ROUTES = {
    products: BASE_URL + "/api/v1/products"
}

const getDefaultProduct = (): IProduct => {
    return {
        id: 0,
        name: "unknown",
        images: [],
        price: 0,
        stock: 0,
        discount: 0,
        description: "",
        characteristics: [],
        subject: 0,
        brand: 0,
    }
}

const getDefaultImage = (): string => {
    return "https://www.eclosio.ong/wp-content/uploads/2018/08/default.png"
}

const getAll = async (params: URLSearchParams): Promise<IProduct[]> => {
    let paramsString = ''
    for (let [key, value] of params.entries()) {
      paramsString += key + '=' + value + '&'
    }
    paramsString = paramsString.slice(0, -1)
    const { data, error } = await useHttpGet<IProduct[]>({ url: ROUTES.products + '?' + paramsString})
    if (data) {
        return data
    } else {
        // TODO: log error
        return []
    }
}

const getById = async (id: number): Promise<IProduct> => {
    const { data, error } = await useHttpGet<IProduct>({ url: ROUTES.products, params: { id } })
    if (data) {
        return data
    } else {
        // TODO: log error
        return getDefaultProduct()
    }
}

export const useProductsApi = () => {
    return {
        getAll,
        getById,
        getDefaultProduct,
        getDefaultImage
    }
}
