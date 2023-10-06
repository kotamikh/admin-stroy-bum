import { defineStore } from "pinia";
import { IBrand, ICategory } from "types/categoriesBrands";
import { ref } from "vue";

export const useCategoriesBrandsStore = defineStore("categoriesBrands", () => {
  const categories = ref<Array<ICategory>>([])
  const brands = ref<Array<IBrand>>([])

  const getAllCategories = (): ICategory[] => {
    fetch("http://192.168.0.2:8000/api/v1/subjects", {
      method: "GET",
    }).then((response) => {
      response.json().then((res) => {
        categories.value = res
      }).catch(e => console.log(e))
    })
    return categories.value
  }

  const insertCategory = (name: string) => {
    fetch("http://192.168.0.2:8000/api/v1/subjects" + `?name=${name}`, {
      method: "POST",
    }).then(() => {
      getAllCategories()
    })
  }

  const findCategoryId = (categoryName: string) => {
    let categories = getAllCategories()
    let currentCategory = categories.filter(cat => cat.name === categoryName)
    return currentCategory[0].id
  }
  const deleteCategory = () => {};

  const getAllBrands = () => {
    fetch("http://192.168.0.2:8000/api/v1/brands", {
      method: "GET",
    }).then((response) => {
      response.json().then((res) => {
        brands.value = res
        return brands.value
      })
    })
  }

  const insertBrand = (name: string) => {
    fetch("http://192.168.0.2:8000/api/v1/brands" + `?name=${name}`, {
      method: "POST",
    }).then(() => {
      getAllBrands()
    })
  }

  // const getBrandsBySubject = (category: string): IBrand[] => {
  //   const categories = getAllCategories()
  //   console.log(category, categories)
  //   let currentCategory = categories.filter(cat => cat.name === category)
  //   console.log(currentCategory)
  //   if (currentCategory) {
  //     fetch(
  //       "http://192.168.0.2:8000/api/v1/brands-by-subject" +
  //       `?subject_id=${currentCategory.id}`,
  //       {
  //         method: "GET",
  //       }
  //     ).then((response) => {
  //       console.log(response)
  //       response.json().then((res) => {
  //        let brandsArray = addBrand.concat(res)
  //         console.log(brandsArray)
  //       })
  //     })
  //   }
  //   return brands.value = addBrand
  // }


  return {
    categories,
    brands,
    getAllCategories,
    insertCategory,
    findCategoryId,
    deleteCategory,
    getAllBrands,
    insertBrand
  };
});
