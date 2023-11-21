import { useHttpDelete, useHttpGet, useHttpPost } from "./base";
import { ICategory } from "../types/categoryBrand";
import { IFolder } from "../types/galleryFolder";

const BASE_URL = "http://localhost:8000/api/v1/images";
const YANDEX_CLOUD = "https://storage.yandexcloud.net/boom-images/";

const ROUTES = {
  folders: BASE_URL + '/folders'
}

const getAllFolders = async (): Promise<Array<IFolder>> => {
  const { data, error } = await useHttpGet({ url: ROUTES.folders })
  if (data) {
    return data
  } else {
    // TODO: log error
    return []
  }
}

const getImagesByFolder = async (folderName: string): Promise<Array<string>> => {
  const { data, error } = await useHttpGet({ url: BASE_URL + `?path=${ folderName }` })
  if (data) {
    return data
  } else {
    // TODO: log error
    return []
  }
}

const getAllImages = async (): Promise<Array<string>> => {
  const { data, error } = await useHttpGet({ url: BASE_URL })
  if (data) {
    return data
  } else {
    // TODO: log error
    return []
  }
}

const addImage = async (folderName: string, file: File) => {
  await useHttpPost({url: BASE_URL + `?name=${folderName}/${ file.name }`, body: file})
}

const deleteImage = async (imageName: string) => {
  await useHttpDelete({ url: BASE_URL + `?name=${ imageName }` })
}

export const useImagesApi = () => {
  return {
    getAllFolders,
    getImagesByFolder,
    getAllImages,
    addImage,
    deleteImage
  }
}
