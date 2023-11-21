<template xmlns="http://www.w3.org/1999/html">
  <h2>Галерея</h2>
  <div v-if="!selectedFolder"
       class="mb-4 font-weight-medium d-flex align-center gap-">
    <v-icon icon="mdi-alert-circle-outline"
    class="text-red-lighten-2 mr-1"
    ></v-icon>
    Выберите папку из списка, чтобы посмотреть изображения
  </div>
  <div class="folders-box" style="height: fit-content; width: 25%; position: relative; border: 2px solid #bfdce8">
    <div v-for="(item, index) in folders" :key="index">
      <Folder :name="item.name" :nested="item.nested" @click="selectedFolder = item.name" @addFolders="onCustom">
        {{ item.name }}
      </Folder>
      <v-row v-if="selectedFolder === item.name"
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
                         scrim="#5C8AAFFF"
                         class="justify-center align-center font-weight-bold"
              >
                <div class="overlay-clue ">ДОБАВИТЬ ИЗОБРАЖЕНИЕ</div>
              </v-overlay>
            </v-img>
          </v-col>
        </v-hover>
        <v-col v-for="i in folderImages"
               :key="i"
               cols="3">
          <v-hover v-slot="{ isHovering, props }">
            <v-img :src="i"
                   v-bind="props"
                   style="aspect-ratio: 1 / 1;">
              <v-btn @click="confirmDelete(i)"
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
              ><p style="color: white; font-size: 18px; text-align: center">{{ store.showName(i) }}</p>
              </v-overlay>
            </v-img>
          </v-hover>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFileDialog } from "@vueuse/core";
import { useImagesStore } from "@/store/images";
import { computed, ref } from "vue";
import Folder from "@/components/Folder.vue";

const store = useImagesStore()

const folders = computed(() => store.folders)
const folderImages = computed(() => store.folderImages)
const selectedFolder = ref('')
const foldersPath = ref('')

const { files, open, reset, onChange } = useFileDialog({
  accept: "image/*"
})

onChange((files) => {
  if (files) {
    const file = files[0]
    console.log(foldersPath.value)
    store.addImage(file, foldersPath.value)
  }
})

const onCustom = async (path: string) => {
  foldersPath.value = path
  path = path.split('/').join(',')
  await store.loadImagesByFolder(path)
  console.log(folderImages.value)
}

store.loadFolders()

const confirmDelete = (i: string) => {
  let confirmation = confirm("Хотите удалить эту картинку?")
  if (confirmation) {
    store.deleteImage(i, selectedFolder.value)
  }
}
</script>


<style scoped lang="sass">
.overlay-clue
  padding: 0 5px
  color: #5C8AAFFF
  text-align: center
  border-radius: 2px
  background-color: white

.delete-btn
  top: 2px
  right: 2px
  z-index: 9999
  position: absolute
  background-color: white
</style>
