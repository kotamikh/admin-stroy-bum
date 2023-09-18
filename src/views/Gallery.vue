<template xmlns="http://www.w3.org/1999/html">
  <div class="gallery-wrapper">
    <h2>Галерея</h2>
    <v-row>
      <v-hover v-slot="{ isHovering, props }">
        <v-col class="add-img"
               cols="3"
               @click="open"
               v-bind="props"
        >

          <v-img src="@/assets/add-img.jpeg"
                 cover
                 aspect-ratio="1"
          >
            <v-overlay :model-value="isHovering"
                       contained
                       scrim="rgb(150, 150, 150)"
                       class="justify-center font-weight-bold pt-15"
            ><p style="font-size: 18px">Добавить изображение</p>
            </v-overlay>
          </v-img>
        </v-col>
      </v-hover>
      <v-col v-for="i in store.images"
             :key="i"
             cols="3"
             class="d-flex child-flex"
      >
        <v-hover v-slot="{ isHovering, props }">
          <v-img
              cover
              :src="i"
              v-bind="props"
              aspect-ratio="1"
              class="position-relative"
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
.delete-btn
  top: 2px
  right: 2px
  z-index: 9999
  position: absolute
  background-color: white
</style>
