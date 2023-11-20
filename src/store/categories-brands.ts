import { defineStore } from "pinia";
import { IBrand, ICategory, ICategoryDto } from "../../types/categoryBrand";
import { ref } from "vue";
import { Ref } from "vue/dist/vue";
import { useCategoriesBrandsApi } from "../../api/categories-brands";

export const useCategoriesBrandsStore = defineStore("categoriesBrands", () => {
  const categoriesMap: Ref<Map<number, ICategory>> = ref(new Map<number, ICategory>());
  const allBrands = ref<Array<IBrand>>([])
  const brandsBySubject = ref<Array<IBrand>>([])
  const api = useCategoriesBrandsApi()

  const loadAllSubjects = async (): Promise<Map<number, ICategory>> => {
    const subjects = await api.getAllSubjects()
    if (subjects.length > 0) {
      categoriesMap.value.clear()
      for (const s of subjects) {
        categoriesMap.value.set(s.id, s)
      }
    }
    return categoriesMap.value
  }

  const insertCategory = async (category: ICategoryDto) => {
    await api.insertSubject(category).then(() => loadAllSubjects())
  }

  const findCategoryId = async (categoryName: string): Promise<number> => {
    await loadAllSubjects()
    for (let [key, value] of categoriesMap.value) {
      if (value.name === categoryName) {
        return key
      }
    }
    return 0
  }

  const deleteCategory = async (id: number) => {
    await api.deleteSubject(id).then(() => loadAllSubjects())
  }

  const loadAllBrands = async (): Promise<Array<IBrand>> => {
    const brands = await api.getAllBrands()
    if (brands.length > 0) {
      allBrands.value = brands
      return allBrands.value
    }
    return []
  }

  const getBrand = async (brandId: number): Promise<IBrand> => {
    return allBrands.value.find(b => b.id === brandId)!
  }

  const getBrandsBySubject = async (subject_id: number): Promise<IBrand[]> => {
    const brandIds = await api.getBrandsBySubject(subject_id)
    if (brandIds.length > 0) {
      let brands: IBrand[] = []
      for (let b of brandIds) {
        brands.push(await getBrand(b))
      }
      brandsBySubject.value = brands
      return brandsBySubject.value
    }
    return []
  }

  const insertBrand = async (name: string) => {
    await api.insertBrand(name)
  }

  const deleteBrand = async (id: number) => {
    await api.deleteBrand(id)
  }

  return {
    categoriesMap,
    allBrands,
    brandsBySubject,
    loadAllSubjects,
    insertCategory,
    findCategoryId,
    deleteCategory,
    loadAllBrands,
    getBrand,
    getBrandsBySubject,
    insertBrand,
    deleteBrand
  };
});
