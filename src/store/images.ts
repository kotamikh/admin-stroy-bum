import { defineStore } from "pinia";
import { ref } from "vue";
import { IFolder} from "../../types/galleryFolder";
import { useImagesApi } from "../../api/images";

const YANDEX_CLOUD = "https://storage.yandexcloud.net/boom-images/";

export const useImagesStore = defineStore("images", () => {
    const images = ref<Array<string>>([])
    const folderImages = ref<Array<string>>([])
    const folders = ref<Array<IFolder>>([])
    const api = useImagesApi()

    const loadFolders = async () => {
      folders.value  = await api.getAllFolders()
      return folders.value
    }

    const loadImagesByFolder = async (folderName: string) => {
      const images = await api.getImagesByFolder(folderName)
      folderImages.value = []
      for (let i of images) {
        if (!i.endsWith('/')) {
          i = YANDEX_CLOUD + i
          folderImages.value.push(i)
        }
      }
      return folderImages.value
    }

    const loadImages = async () => {
      images.value  = await api.getAllImages()
      return images.value
    }

    const addImage = async (file: File, foldersPath: string) => {
      console.log(file.name, foldersPath)
      await api.addImage(foldersPath, file).then(() => loadImagesByFolder(foldersPath))
    };

    const deleteImage = async (image: string, folderName: string) => {
      const imageName = image.replace(YANDEX_CLOUD, "")
      await api.deleteImage(imageName).then(() => loadImagesByFolder(folderName))
    };

    const showName = (image: string) => {
      const name = image.split('/');
      return name[name.length - 1];
    };

    return {
      images,
      folders,
      folderImages,
      loadFolders,
      loadImagesByFolder,
      loadImages,
      addImage,
      deleteImage,
      showName
    };
  })
;
