import { ref } from "vue";
import { Ref } from "vue/dist/vue";
import { defineStore } from "pinia";
import { useSubjectsBrandsApi } from "../../api/subjects-brands";
import { IBrand, ISubject, ISubjectDto } from "../../types/subjectBrand";

export const useSubjectsBrandsStore = defineStore("subjectsBrands", () => {
  const api = useSubjectsBrandsApi()
  const allBrands = ref<Array<IBrand>>([])
  const brandsBySubject = ref<Array<IBrand>>([])
  const subjectsMap: Ref<Map<number, ISubject>> = ref(new Map<number, ISubject>())

  const loadAllSubjects = async (): Promise<Map<number, ISubject>> => {
    const subjects = await api.getAllSubjects()
    if (subjects.length > 0) {
      subjectsMap.value.clear()
      for (const s of subjects) {
        subjectsMap.value.set(s.id, s)
      }
    }
    return subjectsMap.value
  }

  const insertSubject = async (category: ISubjectDto) => {
    await api.insertSubject(category)
  }

  const findSubjectId = (categoryName: string): number => {
    for (let [key, value] of subjectsMap.value) {
      if (value.name === categoryName) {
        return key
      }
    }
    return 0
  }

  const findSubjectName = (categoryId: number): string => {
    for (let [key, value] of subjectsMap.value) {
      if (value.id === categoryId) {
        return value.name
      }
    }
    return ''
  }

  const deleteSubject = async (id: number) => {
    await api.deleteSubject(id)
  }

  const loadAllBrands = async (): Promise<Array<IBrand>> => {
    const brands = await api.getAllBrands()
    if (brands.length > 0) {
      allBrands.value = brands
      return allBrands.value
    }
    return []
  }

  const isBrandExist = (brandId: number): Boolean => {
    const brand = allBrands.value.find(b => b.id === brandId)
    return !!brand
  }

  const getBrandsBySubject = async (subject_id: number): Promise<IBrand[]> => {
    const brandIds = await api.getBrandsBySubject(subject_id)
    if (brandIds.length > 0) {
      brandsBySubject.value = []
      for (let b of brandIds) {
        if (isBrandExist(b)) {
          let brand = allBrands.value.find(brand => brand.id === b)
          if (brand) {
            brandsBySubject.value.push(brand)
          }
        }
      }
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
    allBrands,
    subjectsMap,
    insertBrand,
    deleteBrand,
    isBrandExist,
    loadAllBrands,
    insertSubject,
    findSubjectId,
    deleteSubject,
    findSubjectName,
    brandsBySubject,
    loadAllSubjects,
    getBrandsBySubject
  }
})
