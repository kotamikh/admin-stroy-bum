// const для ссылки
import { defineStore } from "pinia";
import { ref } from "vue";
import { IFolder} from "../../types/galleryFolder";

const BASE_URL = "http://localhost:8000/api/v1/images";
const YANDEX_CLOUD = "https://storage.yandexcloud.net/boom-images/";

export const useImagesStore = defineStore("images", () => {
    const images = ref<Array<string>>([])
    const folderImages = ref<Array<string>>([])
    const folders = ref<Array<IFolder>>([])

    const getFolders = () => {
      fetch(BASE_URL + `/folders`, {
        method: "GET"
      }).then((response) => {
        response.json().then((res: Array<IFolder>) => {
          folders.value = []
          for (let r of res) {
            getImagesByFolder(r.name)
            r.images = folderImages.value
            console.log(r.images)
            folders.value.push(r)
          }
        })
      })
      return folders.value
    }

    const getImagesByFolder = (folderName: string): string[] => {
      fetch(BASE_URL + `?path=${ folderName }`, {
        method: "GET"
      }).then((response) => {
        response.json().then((res: Array<string>) => {
          folderImages.value = [];
          for (let r of res) {
            r = r.replace(folderName + '/', YANDEX_CLOUD)
            folderImages.value.push(r)
          }
          console.log(folderImages.value)
          return folderImages.value
        })
      })
      console.log(folderImages.value)
      return folderImages.value
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
      folderImages,
      getFolders,
      getImagesByFolder,
      getAllImages,
      addImage,
      deleteImage,
      showName
    };
  })
;
