<template xmlns="http://www.w3.org/1999/html">
  <div class="gallery-wrapper">
    <h2>Галерея</h2>
    <v-btn @click="deleteImage('frog')"
class="mb-6">Delete</v-btn>
    <v-row >
      <v-col
        cols="3">
        <v-img src="@/assets/add-img.jpeg"
               cover
               aspect-ratio="1"
               @click="open"
        />
      </v-col>
      <v-col
        v-for="i in images"
        :key="i"
        class="d-flex child-flex"
        cols="3"
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

const images = ref<Array<string>>([])

const { files, open, reset, onChange } = useFileDialog({
  accept: "image/*"
})

onChange((files) => {
  if (files) {
    const file = files[0]
    fetch("http://192.168.0.2:8000/api/v1/images?name=girl", {
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
      images.value = res

    })
  })
}

const deleteImage = (name: string) => {
  fetch(`http://192.168.0.2:8000/api/v1/images?name=${name}.jpg`, {
    method: "DELETE",
  }).then(() => getAllImages())
}

getAllImages()
</script>


<style scoped lang="sass">
</style>
