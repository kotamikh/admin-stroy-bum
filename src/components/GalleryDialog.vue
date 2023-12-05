<template>
  <v-dialog class="d-flex" width="1100" max-height="100%" v-model="props.showDialog">
    <div class="dialog">
      <h3>Выберите фото</h3>
      <v-row>
        <v-col v-for="i in useImagesStore().imagesLinks"
               :key="i"
               cols="3"
               class="gallery"
        >
          <v-hover v-slot="{ isHovering, props }">
            <v-img
                contain
                :src="i"
                v-bind="props"
                aspect-ratio="1"
                :class="[ isImageSelected(i) ? 'chosen image' : 'image']"
                @click="toggleSelected(i)">
              <v-icon icon="mdi-check-circle"
                      v-if="isImageSelected(i)"
                      color="var(--light-blue)"
                      size="large"
                      class="image-icon"
              ></v-icon>
              <v-overlay :model-value="isHovering"
                         contained
                         scrim="var(--scrim)"
                         class="justify-center align-center font-weight-bold"
              ><p style="color: white; font-size: 18px">{{ useImagesStore().getImageName(i) }}</p>
              </v-overlay>
            </v-img>
          </v-hover>
        </v-col>
      </v-row>
    </div>
    <v-spacer></v-spacer>
    <v-btn variant="outlined"
           class="done-btn"
           @click="sendImagesToPage">Готово
    </v-btn>
  </v-dialog>
</template>

<script setup lang="ts">
import { useImagesStore } from "@/store/images";
import { ref } from "vue";
import { useRoute } from "vue-router";

const props = defineProps(['showDialog', 'productImages', 'edit', 'folder', 'categoryImage', 'limit'])
const emit = defineEmits(['update:show', 'update:images'])

const imagesStore = useImagesStore()
const route = useRoute()
imagesStore.loadImagesByFolder('Товары,' + `${props.folder}`)

const selectedImages = ref<Array<string>>([])

if (props.edit) {
  for (let i  = 0; i < props.productImages.length; i++) {
    selectedImages.value.push(props.productImages[i])
  }
}

const isImageSelected = (i: string) => {
  return selectedImages.value.includes(i)
}

const toggleSelected = (i: string) => {
  if (isImageSelected(i)) {
    selectedImages.value = selectedImages.value.filter(item => item !== i)
  } else if (props.limit) {
    selectedImages.value = [i]
  } else {
    selectedImages.value.push(i)
  }
}

const sendImagesToPage = () => {
  emit('update:images', { data: selectedImages.value })
  emit('update:show')
}
</script>

<style scoped lang="sass">
.dialog
  width: 100%
  margin: 0 auto
  overflow-y: scroll
  padding: 20px 30px 80px
  border-radius: 10px
  background-color: white

  h3
    margin-bottom: 20px

  .gallery
    display: flex

    .image
      text-align: center

    .chosen
      border: 3px solid var(--light-blue)

    .image-icon
      position: absolute
      top: 5px
      right: 5px

.done-btn
  bottom: 1%
  width: 95%
  height: 60px
  color: white
  position: fixed
  align-self: center
  background-color: var(--light-blue)
</style>
