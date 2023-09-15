<template xmlns="http://www.w3.org/1999/html">
  <div class="gallery-wrapper">
    <h2>Галерея</h2>
    <v-btn @click="deleteImage(0)">Delete</v-btn>
    <v-row>
      <v-col>
        <v-img src="@/assets/add-img.jpeg"
               cover
               :width="200"
               :max-width="400"
               aspect-ratio="1"
               @click="open"
        />
      </v-col>
      <v-col
        v-for="i in images"
        :key="i"
        class="d-flex child-flex"
      >
        <v-img
          aspect-ratio="1"
          cover
          :src="i"
        ></v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { useFileDialog } from "@vueuse/core";
import { ref } from "vue";

// const images = ["https://weblinks.ru/wp-content/uploads/2022/08/0d6de7af1701b7f6ff551d4474ced401-730x578.jpeg", "https://fikiwiki.com/uploads/posts/2022-02/1644972802_1-fikiwiki-com-p-kartinki-krasivie-na-android-1.jpg", "https://pibig.info/uploads/posts/2022-06/1655671236_1-pibig-info-p-detskie-kartinki-pro-leto-krasivo-1.jpg"]
const images = ref<Array<string>>([])

const { files, open, reset, onChange } = useFileDialog({
  accept: "image/*"
})

onChange((files) => {
  if (files) {
    const file = files[0]
    fetch("http://192.168.0.2:8000/api/v1/images?name=crazy-frog", {
      method: "POST",
      body: file
    }).then(response => {
      response.json().then(res => {
        console.log(res.value)
      })
    })
  }
})

const getAllImages = () => {
  fetch("http://192.168.0.2:8000/api/v1/images", {
    method: 'GET',
  }).then(response => {
    response.json().then(res => {
      for (let r of res) {
        images.value.push(r)
        console.log(images.value)
      }
    })
  })
}

const deleteImage = (id: number) => {
  fetch("http://192.168.0.2:8000/api/v1/images", {
    method: "DELETE",

  }).then(response => {
    console.log(response.json())
    getAllImages()
  })
}

getAllImages()
</script>


<style scoped lang="sass">
</style>
