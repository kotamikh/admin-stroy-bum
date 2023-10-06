import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { IProduct, IProductDto } from "../../types/product";

const BASE_URL = "http://192.168.0.2:8000";

const ROUTES = {
  products: BASE_URL + "/api/v1/products",
};
export const useProductsStore = defineStore("cardsStore", () => {
  const products: Ref<Map<number, IProduct>> = ref(new Map<number, IProduct>());

  const loadAll = (offset: number, limit: number) => {
    const params = { offset: offset.toString(), limit: limit.toString() };

    fetch(ROUTES.products + "?" + new URLSearchParams(params), {
      method: "GET",
    })
      .then((response) => {
        response.json().then((res) => {
          products.value.clear();
          for (const r of res) {
            products.value.set(r.id, r);
          }
        });
      })
      .catch((e) => {
        console.log("Error: " + e.message);
        console.log(e.response);
      });
  };

  const insertCard = (product: IProductDto, isEdit: boolean) => {
    fetch(ROUTES.products + `?edit=${isEdit}`, {
      method: "PUT",
      body: JSON.stringify(product),
    })
      .then(() => {
        loadAll(0, 30)
        console.log(products.value)
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
      });
  };

  return {
    products,
    insertCard,
    loadAll,
    deleteCard,
  };
});
