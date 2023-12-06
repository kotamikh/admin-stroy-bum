import { IProduct, IProductDto } from "@/types/product";
import { useHttpDelete, useHttpGet, useHttpPut } from "@/api/base";

export type GetAllRequest = {
    offset: number,
    limit: number,
    subject?: number,
    brand?: number,
}

const BASE_URL = "http://localhost:8000"

const ROUTES = {
    products: BASE_URL + "/api/v1/products"
}

const getDefaultProduct = (subjectId: number): IProductDto => {
    return {
        name: "",
        images: [],
        price: 0,
        stock: 1,
        discount: 0,
        description: "",
        characteristics: [],
        subject: subjectId,
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

const insertProduct = async (product: IProductDto, isEdit: boolean) => {
  await useHttpPut({ url: ROUTES.products + `?edit=${isEdit}`, body: JSON.stringify(product)})
}

const deleteProduct = async (id: number) => {
  await useHttpDelete({ url: ROUTES.products + `?id=${id}` })
}

export const useProductsApi = () => {
    return {
        getAll,
        insertProduct,
        deleteProduct,
        getDefaultImage,
        getDefaultProduct
    }
}
