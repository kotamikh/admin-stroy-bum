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
            folders.value.push(r)
          }
        })
      })
      return folders.value
    }

    const getImagesByFolder = (folderName: string) => {
      fetch(BASE_URL + `?path=${ folderName }`, {
        method: "GET"
      }).then((response) => {
        response.json().then((res: Array<string>) => {
          folderImages.value = [];
          for (let r of res) {
            if (!r.endsWith('/')) {
              console.log(r)
              r = YANDEX_CLOUD + r
              folderImages.value.push(r)
            }
          }
        })
      })
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
      console.log(image)
      const name = image.replace(YANDEX_CLOUD, "");
      let folderArray = name.split('/')
      let folderName = folderArray.splice(folderArray.length - 1).join(',')

      fetch(BASE_URL + `?name=${ name }`, {
        method: "DELETE",
      }).then(() => getImagesByFolder(folderName));
    };

    const showName = (image: string) => {
      const name = image.split('/');
      return name[name.length - 1];
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
