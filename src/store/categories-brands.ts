import { defineStore } from "pinia";
import { IBrand, ICategory, ICategoryDto } from "types/categoriesBrands";
import { ref } from "vue";
import { Ref } from "vue/dist/vue";

export const useCategoriesBrandsStore = defineStore("categoriesBrands", () => {
  const categories: Ref<Map<number, ICategory>> = ref(new Map<number, ICategory>());
  const brands = ref<Array<IBrand>>([])

  const getAllCategories = (): Map<number, ICategory> => {
    fetch("http://192.168.0.2:8000/api/v1/subjects", {
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
    fetch("http://192.168.0.2:8000/api/v1/subjects", {
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
    fetch("http://192.168.0.2:8000/api/v1/subjects" + `?id=${id}`, {
      method: "DELETE"
    }).then(() =>  getAllCategories())
        .catch((e) => {
            console.log("Error: " + e.message);
            console.log(e.response);
        })
  };

  const getAllBrands = (): IBrand[] => {
    fetch("http://192.168.0.2:8000/api/v1/brands", {
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
    fetch("http://192.168.0.2:8000/api/v1/brands", {
      method: "POST",
      body: JSON.stringify({
        name: name
      })
    }).then(() => {
      getAllBrands()
    })
  }

  const deleteBrand = (id: number) => {
    fetch("http://192.168.0.2:8000/api/v1/brands" + `?id=${id}`, {
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
