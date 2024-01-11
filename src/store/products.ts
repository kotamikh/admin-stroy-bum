import { ref, Ref } from "vue";
import { defineStore } from "pinia";
import { useProductsApi } from "@/api/products";
import { IProduct, IProductDto } from "@/types/product";

export const useProductsStore = defineStore("cardsStore", () => {
  const api = useProductsApi()
  const productsMap: Ref<Map<number, IProduct>> = ref(new Map<number, IProduct>())
  const currentProducts: Ref<Map<number, IProduct>> = ref(new Map<number, IProduct>())

  const loadAll = async (offset: number, limit: number)=> {
    const params = new URLSearchParams({ offset: offset.toString(), limit: limit.toString() })

    await api.getAll(params).then((response) => {
      if (response.length > 0) {
        productsMap.value.clear()
        for (const p of response) {
          if (p.images === null) {
            p.images = []
          }
          productsMap.value.set(p.id, p)
        }
        return productsMap.value
      }
    })
  }

  const loadAllWithParams = async (offset: number, limit: number, subject?: number, brand?: number)=> {
    const params = new URLSearchParams({ offset: offset.toString(), limit: limit.toString() })
    if (subject) {
      params.append('subject', subject.toString())
    }
    if (brand) {
      params.append('brand', brand.toString())
    }

    await api.getAll(params).then((response) => {
      currentProducts.value.clear()
      if (response.length > 0) {
        currentProducts.value.clear()
        for (const p of response) {
          if (p.images === null) {
            p.images = []
          }
          currentProducts.value.set(p.id, p)
        }
        return currentProducts.value
      }
    })
  }

  const getProduct = (id: number) => {
    let p = productsMap.value.get(id)
    if (p) {
      return p
    }
  }

  const insertProduct = async (product: IProductDto, isEdit: boolean) => {
    await api.insertProduct(product, isEdit)
  }

  const deleteProduct = async (id: number) => {
    await api.deleteProduct(id)
  }

  const getProductNumber = (): number => {
    return productsMap.value.size
  }

  return {
    loadAll,
    getProduct,
    productsMap,
    insertProduct,
    deleteProduct,
    currentProducts,
    getProductNumber,
    loadAllWithParams
  }
})
