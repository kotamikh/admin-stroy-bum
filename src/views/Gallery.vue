<template xmlns="http://www.w3.org/1999/html">
  <h2>Галерея изображений</h2>
  <div v-if="!foldersPath"
       class="mb-4 font-weight-medium d-flex align-center gap-">
    <v-icon icon="mdi-alert-circle-outline"
    class="text-red-lighten-2 mr-1"
    ></v-icon>
    Выберите папку из списка, чтобы посмотреть изображения
  </div>
  <div class="folders-box" style="height: fit-content; width: 25%; position: relative; border: 2px solid var(--dark-blue); border-radius: 7px">
    <div v-for="(item, index) in folders" :key="index">
      <Folder :name="item.name" :nested="item.nested" @addFolders="onCustom">
        {{ item.name }}
      </Folder>
      <v-row v-if="foldersPath"
             style="top: 0; left: 110%; width: 60vw"
             class="position-absolute d-flex">
        <v-hover v-slot="{ isHovering, props }">
          <v-col cols="3"
                 @click="open"
                 v-bind="props"
          >
            <v-img src="@/assets/add-img.avif" style="cursor: pointer">
              <v-overlay :model-value="isHovering"
                         contained
                         scrim="var(--scrim)"
                         style="border-radius: 5px"
                         class="justify-center align-center"
              >
                <div class="overlay-clue">ДОБАВИТЬ ИЗОБРАЖЕНИЕ</div>
              </v-overlay>
            </v-img>
          </v-col>
        </v-hover>
        <v-col v-for="i in store.imagesLinks"
               :key="i"
               cols="3">
          <v-hover v-slot="{ isHovering, props }">
            <v-img :src="i"
                   v-bind="props"
                   style="aspect-ratio: 1 / 1;">
              <v-btn size="small"
                     variant="plain"
                     class="delete-btn"
                     @click="confirmDelete(i)">
                <v-icon size="x-large" icon="mdi-delete"/>
              </v-btn>
              <v-overlay :model-value="isHovering"
                         contained
                         scrim="var(--scrim)"
                         style="border-radius: 5px"
                         class="justify-center align-center"
              ><p style="color: #808080; font-size: 18px; background-color: white; padding: 0 10px">{{ store.getImageName(i) }}</p>
              </v-overlay>
            </v-img>
          </v-hover>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import Folder from "@/components/Folder.vue";
import { useFileDialog } from "@vueuse/core";
import { useImagesStore } from "@/store/images";

const store = useImagesStore()

const folders = computed(() => store.folders)
const foldersPath = ref('')

const { files, open, reset, onChange } = useFileDialog({
  accept: "image/*"
})

onChange((files) => {
  if (files) {
    const file = files[0]
    store.addImage(file, foldersPath.value).then(() => store.loadImagesByFolder(foldersPath.value))
  }
})

const onCustom = async (path: string) => {
  foldersPath.value = path
  path = path.split('/').join(',')
  await store.loadImagesByFolder(path)
}

store.loadFolders()

const confirmDelete = (img: string) => {
  let confirmation = confirm("Хотите удалить эту картинку?")
  if (confirmation) {
    store.deleteImage(img).then(() => store.loadImagesByFolder(foldersPath.value))
  }
}
</script>


<style scoped lang="sass">
.overlay-clue
  text-align: center
  background-color: white
  color: var(--middle-grey)

.delete-btn
  top: 2px
  right: 2px
  z-index: 9999
  position: absolute
  background-color: white
</style>
