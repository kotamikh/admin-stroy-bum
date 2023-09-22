<template>
  <v-dialog width="1100" max-height="100%" v-model="props.showDialog">
    <div class="dialog">
      <h3>Выберите фото товара</h3>
      <v-row>
        <v-col v-for="i in store.images"
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
                      color="#E3DD5F"
                      size="large"
                      class="image-icon"
              ></v-icon>
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
      <v-btn color="#49AE66"
             variant="outlined"
             class="mt-8"
             prepend-icon="mdi-check"
             @click="sendImagesToPage">Готово</v-btn>
    </div>
  </v-dialog>
</template>

<script setup lang="ts">
import { useImagesStore } from "@/store/images";
import { ref } from "vue";

const props = defineProps(['showDialog', 'productImages'])
const emit = defineEmits(['update:show', 'update:images'])

const store = useImagesStore()
store.getAllImages()

const selectedImages = ref<Array<string>>([])
const isImageSelected = (i: string) => {
  return selectedImages.value.includes(i)
}

const toggleSelected = (i: string) => {
  if (isImageSelected(i)) {
    selectedImages.value = selectedImages.value.filter(item => item !== i)
  }
  else {
    selectedImages.value.push(i)
  }
}

const sendImagesToPage = () => {
  emit('update:images', {data: selectedImages.value})
  emit('update:show')
}
</script>

<style scoped lang="sass">
.dialog
  width: 100%
  padding: 20px 30px
  margin: 0 auto
  background-color: white
  border-radius: 10px

  h3
    margin-bottom: 20px

  .gallery
    display: flex

    .image.chosen
      border: 3px solid #E3DD5F

    .image-icon
      position: absolute
      top: 5px
      right: 5px
</style>
