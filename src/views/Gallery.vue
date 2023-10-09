<template xmlns="http://www.w3.org/1999/html">
  <div class="gallery-wrapper">
    <h2>Галерея</h2>
    <v-row>
      <v-hover v-slot="{ isHovering, props }">
        <v-col cols="3"
               @click="open"
               v-bind="props"
        >
          <v-img src="@/assets/add-img.avif"
          >
            <v-overlay :model-value="isHovering"
                       contained
                       scrim="#5C8AAFFF"
                       class="justify-center align-center font-weight-bold"
            ><div class="overlay-clue">ДОБАВИТЬ ИЗОБРАЖЕНИЕ</div>
            </v-overlay>
          </v-img>
        </v-col>
      </v-hover>
      <v-col v-for="i in store.images"
             :key="i"
             cols="3"
      >
        <v-hover v-slot="{ isHovering, props }">
          <v-img
              :src="i"
              v-bind="props"
              class="image"
          >
            <v-btn @click="store.deleteImage(i)"
                   size="small"
                   color="white"
                   variant="tonal"
                   class="delete-btn button">
              <v-icon size="x-large" icon="mdi-delete"/>
            </v-btn>
            <v-overlay :model-value="isHovering"
                       contained
                       scrim="rgb(30, 30, 30)"
                       class="justify-center align-center font-weight-bold"
            ><p style="color: white; font-size: 18px">{{ store.showName(i) }}</p>
            </v-overlay>
          </v-img>
        </v-hover>
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
.overlay-clue
  padding: 0 5px
  font-size: 18px
  color: #5C8AAFFF
  border-radius: 2px
  background-color: white


.delete-btn
  top: 2px
  right: 2px
  z-index: 9999
  position: absolute
  background-color: white
</style>
