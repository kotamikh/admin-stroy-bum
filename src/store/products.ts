import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { IProduct, IProductDto } from "../../types/product";
import { useProductsApi } from "../../api/products";

const BASE_URL = "http://localhost:8000";

const ROUTES = {
  products: BASE_URL + "/api/v1/products",
}

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

  const insertCard = (product: IProductDto, isEdit: boolean) => {
    fetch(ROUTES.products + `?edit=${isEdit}`, {
      method: "PUT",
      body: JSON.stringify(product),
    })
      .then(() => {
        loadAll(0, 30)
        console.log(productsMap.value)
      })
      .catch((e) => {
        console.log("Error: " + e.message);
        console.log(e.response);
      });
  };

  const deleteCard = (id: number) => {
    fetch(ROUTES.products + `?id=${id}`, {
      method: "DELETE",
    })
      .then(() => loadAll(0, 30))
      .catch((e) => {
        console.log("Error: " + e.message);
        console.log(e.response);
      })
  };

  return {
    productsMap,
    insertCard,
    loadAll,
    deleteCard,
  };
});
