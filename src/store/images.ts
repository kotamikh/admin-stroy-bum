// const для ссылки
import { defineStore } from 'pinia'
import { ref } from "vue";

const BASE_URL = 'http://192.168.0.2:8000/api/v1/images'
const YANDEX_CLOUD = 'https://storage.yandexcloud.net/boom-images/'

export const useImagesStore = defineStore('images', () => {
  const images = ref<Array<string>>([])

  const getAllImages = () => {
    fetch(BASE_URL, {
      method: 'GET',
    }).then(response => {
      response.json().then(res => {
        let arrOfImages = []
        for (let r of res) {
          arrOfImages.push(YANDEX_CLOUD + `${ r }`)
        }
        images.value = arrOfImages
      })
    })
  }

  const addImage = (file: File) => {
    fetch(BASE_URL + `?name=${file.name}`, {
      method: "POST",
      body: file
    }).then(() => getAllImages())
  }

  const deleteImage = (image: string) => {
    const name = image.replace(YANDEX_CLOUD, '')
    fetch(BASE_URL + `?name=${ name }`, {
      method: "DELETE",
    }).then(() => getAllImages())
  }

  return {
    images,
    getAllImages,
    addImage,
    deleteImage
  }
})