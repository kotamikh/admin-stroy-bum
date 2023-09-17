<template xmlns="http://www.w3.org/1999/html">
  <div class="gallery-wrapper">
    <h2>Галерея</h2>
    <v-row>
      <v-hover v-slot="{ isHovering, props }">
        <v-col class="add-img"
               cols="3"
               v-bind="props"
               @click="open"
               >

          <v-img src="@/assets/add-img.jpeg"
                 cover
                 aspect-ratio="1"
          >
            <v-overlay :model-value="isHovering"
                       contained
                       scrim="rgb(150, 150, 150)"
                       class="justify-center font-weight-bold pt-15"
            >Добавить изображение</v-overlay>
          </v-img>
        </v-col>
      </v-hover>
      <v-col
          v-for="i in store.images"
          :key="i"
          class="d-flex child-flex"
          cols="3"
      >
        <v-img
            aspect-ratio="1"
            cover
            :src="i"
            class="position-relative"
        >
          <v-btn @click="store.deleteImage(i)"
                 variant="tonal"
                 size="small"
                 color="white"
                 class="delete-btn button">
            <v-icon size="x-large" icon="mdi-delete"/>
          </v-btn>
        </v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { useFileDialog } from "@vueuse/core";
import { useImagesStore } from "@/store/images";

const store = useImagesStore()

const { files, open, reset, onChange } = useFileDialog({
  accept: "image/*"
})

onChange((files) => {
  if (files) {
    const file = files[0]
    store.addImage(file)
  }
})

store.getAllImages()
</script>


<style scoped lang="sass">
.delete-btn
  position: absolute
  right: 2px
  top: 2px
  background-color: white
</style>
