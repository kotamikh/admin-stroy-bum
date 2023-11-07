// const для ссылки
import { defineStore } from "pinia";
import { ref } from "vue";
import { IFolder, IFolderDto } from "../../types/galleryFolder";

const BASE_URL = "http://localhost:8000/api/v1/images";
const YANDEX_CLOUD = "https://storage.yandexcloud.net/boom-images/";

export const useImagesStore = defineStore("images", () => {
    const images = ref<Array<string>>([]);
    const folders = ref<Array<IFolder>>([])

    const getFolders = () => {
      fetch(BASE_URL + `/folders`, {
        method: "GET"
      }).then((response) => {
        response.json().then((res: Array<IFolderDto>) => {
          let nesting = 1
          let allFolders = new Map<number, IFolder>()
          findFolderNames(res)
          console.log(findFolderNames(res), res)

          function findFolderNames(obj: IFolderDto[]) {
            for (let o of obj) {
              if (!o.nested) {
                let images: string[] = getImagesByFolder(o.name)
                allFolders.set(nesting, { ...o, images })
              } else {
                let images: string[] = getImagesByFolder(o.name)
                allFolders.set(nesting, { ...o, images })
                nesting++
                findFolderNames(o.nested)
              }
            }
            return allFolders
          }
        })
      })
    }

    const getImagesByFolder = (folderName: string): string[] => {
      fetch(BASE_URL + `?path=${ folderName }`, {
        method: "GET"
      }).then((response) => {
        response.json().then((res: Array<string>) => {
          let arrOfImages = [];
          for (let r of res) {
            r = r.replace(folderName, YANDEX_CLOUD)
            arrOfImages.push(r)
          }
          images.value = arrOfImages
        })
      })
      return images.value
    }

    const getAllImages = () => {
      fetch(BASE_URL, {
        method: "GET",
      }).then((response) => {
        response.json().then((res) => {
          let arrOfImages = [];
          for (let r of res) {
            arrOfImages.push(YANDEX_CLOUD + `${ r }`);
          }
          images.value = arrOfImages
        })
      })
    }

    const addImage = (file: File) => {
      fetch(BASE_URL + `?name=${ file.name }`, {
        method: "POST",
        body: file,
      }).then(() => getAllImages());
    };

    const deleteImage = (image: string) => {
      const name = image.replace(YANDEX_CLOUD, "");
      fetch(BASE_URL + `?name=${ name }`, {
        method: "DELETE",
      }).then(() => getAllImages());
    };

    const showName = (image: string) => {
      const name = image.replace(YANDEX_CLOUD, "");
      const file = new File([image], name);
      return file.name;
    };

    return {
      images,
      folders,
      getFolders,
      getImagesByFolder,
      getAllImages,
      addImage,
      deleteImage,
      showName
    };
  })
;
