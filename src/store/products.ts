import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { IProduct, IProductDto } from "../../types/product";
import { useProductsApi } from "../../api/products";

export const useProductsStore = defineStore("cardsStore", () => {
  const productsMap: Ref<Map<number, IProduct>> = ref(new Map<number, IProduct>());
  const api = useProductsApi()

  const loadAll = async (offset: number, limit: number, subject?: number, brand?: number)=> {
    const params = new URLSearchParams({ offset: offset.toString(), limit: limit.toString() })
    if (subject) {
      params.append('subject', subject.toString())
    }
    if (brand) {
      params.append('brand', brand.toString())
    }

    await api.getAll(params).then((response) => {
      if (response.length > 0) {
        productsMap.value.clear()
        for (const p of response) {
          productsMap.value.set(p.id, p)
        }
      }
    })
    return productsMap.value
  }

  const insertCard = async (product: IProductDto, isEdit: boolean) => {
    await api.insertProduct(product, isEdit)
  }

  const deleteCard = async (id: number) => {
    await api.deleteProduct(id).then(() => loadAll(0, 100))
  }

  return {
    productsMap,
    insertCard,
    loadAll,
    deleteCard,
  };
});
