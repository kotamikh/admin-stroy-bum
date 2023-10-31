import { defineStore } from "pinia";
import { IBrand, ICategory, ICategoryDto } from "types/categoriesBrands";
import { ref } from "vue";
import { Ref } from "vue/dist/vue";

const BASE_URL = "http://localhost:8000"

const ROUTES = {
  subjects: BASE_URL + "/api/v1/subjects",
  brands: BASE_URL + "/api/v1/brands"
}

export const useCategoriesBrandsStore = defineStore("categoriesBrands", () => {
  const categories: Ref<Map<number, ICategory>> = ref(new Map<number, ICategory>());
  const brands = ref<Array<IBrand>>([])

  const getAllCategories = (): Map<number, ICategory> => {
    fetch(ROUTES.subjects, {
      method: "GET",
    }).then((response) => {
      response.json().then((res) => {
        categories.value.clear()
          for (const r of res) {
              categories.value.set(r.id, r);
          }
      }).catch((e) => {
          console.log("Error: " + e.message)
          console.log(e.response)
      })
    })
    return categories.value
  }

  const insertCategory = (category: ICategoryDto) => {
    fetch(ROUTES.subjects, {
      method: "POST",
      body: JSON.stringify(category)
    }).then(() => {
      getAllCategories()
    })
  }

  const findCategoryId = (categoryName: string) => {
    let categories = getAllCategories()
    for (let [key, value] of categories.entries()) {
      if (value.name === categoryName) {
        return key
      }
    }
  }

  const deleteCategory = (id: number) => {
    fetch(ROUTES.subjects + `?id=${id}`, {
      method: "DELETE"
    }).then(() =>  getAllCategories())
        .catch((e) => {
            console.log("Error: " + e.message);
            console.log(e.response);
        })
  };

  const getAllBrands = (): IBrand[] => {
    fetch(ROUTES.brands, {
      method: "GET",
    }).then((response) => {
      response.json().then((res) => {
        brands.value = res
        return brands.value
      })
    })
    return []
  }

  const insertBrand = (name: string) => {
    fetch(ROUTES.brands, {
      method: "POST",
      body: JSON.stringify({
        name: name
      })
    }).then(() => {
      getAllBrands()
    })
  }

  const deleteBrand = (id: number) => {
    fetch(ROUTES.brands + `?id=${id}`, {
      method: "DELETE"
    }).then(() =>  getAllBrands())
        .catch((e) => {
          console.log("Error: " + e.message);
          console.log(e.response);
        })
  }


  return {
    categories,
    brands,
    getAllCategories,
    insertCategory,
    findCategoryId,
    deleteCategory,
    getAllBrands,
    insertBrand,
    deleteBrand
  };
});
