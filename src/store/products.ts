import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { IProduct } from "../../types/product";
import { useFetch } from "@vueuse/core";

const BASE_URL = "http://192.168.0.2:8000"

const ROUTES = {
  products: BASE_URL + "/api/v1/products",
}
export const useProductsStore = defineStore('cardsStore', () => {
  const products: Ref<Map<number, IProduct>> = ref(new Map<number, IProduct>())

  const loadAll = async (offset: number, limit: number): Promise<boolean> => {
    const { data, error} = await useFetch<IProduct[]>(ROUTES.products, {
      method: 'GET',
      params: {
        offset: offset,
        limit: limit,
      }
    })

    if (error.value) {
      //alert("Ошибка смотри в консоль")
      console.log(error.value)
      return false
    }

    if (data.value) {
      products.value.clear()
      for (const p of data.value) {
        products.value.set(p.id, p)
      }
    }
    return true
  }

  const createNewCard = async (product: IProduct): Promise<boolean> => {
    const { error } = await useFetch(ROUTES.products, {
      method: 'POST',
      body: JSON.stringify(product),
    })

    if (error.value) {
      alert("Ошибка смотри в консоль")
      console.log(error.value)
      return false
    }

    return true
  }

  return {
    createNewCard,
  }
})
