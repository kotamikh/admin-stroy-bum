import { ref } from "vue";
import { defineStore } from "pinia";
import { useImagesApi } from "@/api/images";
import { IFolder } from "@/types/galleryFolder";

const YANDEX_CLOUD = "https://storage.yandexcloud.net/boom-images/"

export const useImagesStore = defineStore("images", () => {
    const api = useImagesApi()
    const imagesLinks = ref<Array<string>>([])
    const folders = ref<Array<IFolder>>([])

    const loadFolders = async () => {
      folders.value  = await api.getAllFolders()
      folders.value.sort((f1, f2) => f1.name > f2.name ? 1 : -1)
      return folders.value
    }

    const loadImagesByFolder = async (folderName: string) => {
      await api.getImagesByFolder(folderName).then((images) => {
          imagesLinks.value = []
          for (let imageName of images) {
            if (!imageName.endsWith('/')) {
              imageName = YANDEX_CLOUD + imageName
              imagesLinks.value.push(imageName)
            }
          }
      })
      return imagesLinks.value
    }

    const addImage = async (file: File, foldersPath: string) => {
      await api.addImage(foldersPath, file)
    }

    const deleteImage = async (image: string) => {
      const imageName = image.replace(YANDEX_CLOUD, "")
      await api.deleteImage(imageName)
    }

    const getImageName = (image: string) => {
      const name = image.split('/')
      return name[name.length - 1]
    }

    return {
      folders,
      addImage,
      loadFolders,
      deleteImage,
      imagesLinks,
      getImageName,
      loadImagesByFolder
    }
  })
