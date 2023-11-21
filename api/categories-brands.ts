import { useHttpDelete, useHttpGet, useHttpPost } from "./base";
import { IBrand, ICategory, ICategoryDto } from "../types/categoryBrand";

const BASE_URL = "http://localhost:8000"

export type brandsBySubject = {
   category: string
}

const ROUTES = {
    subjects: BASE_URL + "/api/v1/subjects",
    brands: BASE_URL + "/api/v1/brands",
    brandsbysubject: BASE_URL + '/api/v1/brands-by-subject'
}

const getAllSubjects = async (): Promise<ICategory[]>  => {
  const { data, error } = await useHttpGet<ICategory[]>({ url: ROUTES.subjects })
  if (data) {
    return data
  } else {
    // TODO: log error
    return []
  }
}

const insertSubject = async (category: ICategoryDto) => {
  await useHttpPost({ url: ROUTES.subjects, body: JSON.stringify(category)})
}

const deleteSubject = async (id: number) => {
  await useHttpDelete({ url: ROUTES.subjects + `?id=${id}`})
}

const getAllBrands = async (): Promise<IBrand[]>  => {
    const { data, error } = await useHttpGet<IBrand[]>({ url: ROUTES.brands })
    if (data) {
        return data
    } else {
        // TODO: log error
        return []
    }
}

const getBrandsBySubject = async (subject_id: number): Promise<number[]> => {
    const { data, error } = await useHttpGet<number[]>({ url: ROUTES.brandsbysubject + `?subject_id=${subject_id}` })
    if (data) {
        return data
    } else {
        // TODO: log error
        return []
    }
}

// выводить обновлённые бренды
const insertBrand = async (name: string) => {
  const { data, error } = await useHttpPost({ url: ROUTES.brands, body: JSON.stringify({
      name: name
    })
  })
  if (data) {
    return data
  } else  {
    return []
  }
}

// выводить обновлённые бренды
const deleteBrand = async (id: number)=> {
  const { data, error } = await useHttpDelete({ url: ROUTES.brands + `?id=${ id }` })
  if (data) {
    return data
  } else  {
    return []
  }
}

export const useCategoriesBrandsApi = () => {
    return {
        getAllSubjects,
        insertSubject,
        deleteSubject,
        getAllBrands,
        getBrandsBySubject,
        insertBrand,
        deleteBrand
    }
}
