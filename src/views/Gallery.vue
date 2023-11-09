<template xmlns="http://www.w3.org/1999/html">
  <h2>Галерея</h2>
  <div class="folders-box" style="height: fit-content; width: 25%; position: relative; border: 2px solid #bfdce8">
    <div v-for="(item, index) in folders" :key="index">
      <Folder v-bind="{
            name: item.name,
            nested: item.nested
          }"
      >{{ item.name }}
      </Folder>
      <v-row v-if="selectedFolder = item.name"
             style="top: 0; left: 110%; width: 60vw"
             class="position-absolute d-flex">
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
              >
                <div class="overlay-clue">ДОБАВИТЬ ИЗОБРАЖЕНИЕ</div>
              </v-overlay>
            </v-img>
          </v-col>
        </v-hover>
        <v-col v-for="i in store.images"
               :key="i"
               cols="3">
          <v-hover v-slot="{ isHovering, props }">
            <v-img :src="i">
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
  </div>
</template>

<script setup lang="ts">
import { useFileDialog } from "@vueuse/core";
import { useImagesStore } from "@/store/images";
import { computed, ref } from "vue";
import Folder from "@/components/Folder.vue";

const store = useImagesStore()

const folders = computed(() => store.folders)
console.log(folders)
const selectedFolder = ref('')

const { files, open, reset, onChange } = useFileDialog({
  accept: "image/*"
})

onChange((files) => {
  if (files) {
    const file = files[0]
    store.addImage(file)
  }
})

// store.getAllImages()
store.getFolders()
</script>


<style scoped lang="sass">
.overlay-clue
  padding: 0 5px
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
