<template>
  <div class="product-images">
    <div class="gallery-wrapper">
      <button class="up-button" @click="moveToTop">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
        >
          <path d="m12 10.8l-4.6 4.6L6 14l6-6l6 6l-1.4 1.4l-4.6-4.6Z"/>
        </svg>
      </button>
      <div class="slider-gallery">
        <div class="slider-track" ref="track">
          <div
              v-if="images?.length === 0"
              v-for="img in 3"
              :key="img"
              class="default-img"
              style="background-color: #eeeeee"
          >
            <v-icon icon="mdi-camera" size="x-large"></v-icon>
          </div>
          <img
              v-else
              v-for="(image, index) in images"
              :src="image"
              :key="index"
              alt="image"
              :class="[{ current: isCurrent(index) }, 'image']"
              @click="currentImageIndex = index"
          />
        </div>
      </div>
      <button class="down-button" @click="moveToDown">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
        >
          <path d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4l-6 6Z"/>
        </svg>
      </button>
    </div>
    <div class="current-photo" @click="emit('update:galleryDialog')">
      <div v-if="props.images?.length === 0" class="default-img">
        <v-icon icon="mdi-camera" size="100"></v-icon>
      </div>
      <v-img
          v-else
          class="image"
          :src="currentImageSrc"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps(['images', 'isEdit', 'folder'])
const emit = defineEmits(['update:galleryDialog'])

const currentImageIndex = ref<number>(0)

const currentImageSrc = computed<string>(() => {
  if (props.images && props.images.length > 0) {
    return props.images[currentImageIndex.value]
  }
  return ""
})

const isCurrent = (index: number) => {
  return index === currentImageIndex.value
}

const track = ref<HTMLDivElement | undefined>()

const trackTranslate = ref(0)
const translateLimit = computed(() => {
  if (props.images) {
    return -(props.images.length - 3) * 140
  }
  return 0
})

const moveToTop = () => {
  if (trackTranslate.value < 0) {
    trackTranslate.value += 140
    if (track.value) {
      track.value.style.transform = `translateY(${ trackTranslate.value }px)`
    }
  }
}

const moveToDown = () => {
  if (trackTranslate.value > translateLimit.value) {
    trackTranslate.value -= 140
    if (track.value) {
      track.value.style.transform = `translateY(${ trackTranslate.value }px)`
    }
  }
}
</script>

<style scoped lang="sass">
.product-images
  gap: 20px
  height: 450px
  display: flex

  .gallery-wrapper
    display: flex
    height: 450px
    position: relative

    .up-button,
    .down-button
      left: 50%
      border: none
      position: absolute
      background-color: transparent
      transform: translate(-50%, -50%)

      svg > path
        fill: var(--middle-grey)

    .up-button
      top: -12px

    .down-button
      bottom: -60px

    .slider-gallery
      width: 150px
      height: 450px
      padding: 15px
      overflow: hidden
      align-self: center

      .slider-track
        transition: all 0.2s ease

        .default-img
          display: flex
          width: 100%
          height: 130px
          border-radius: 5px
          align-items: center
          margin-bottom: 15px
          justify-content: center

        .image
          display: flex
          padding: 2%
          width: 100%
          height: 130px
          border-radius: 5px
          object-fit: contain
          margin-bottom: 15px
          align-items: center
          justify-content: center
          transition: scale 0.2s ease

        .current
          transform: scale(1.2)

  .current-photo
    display: flex
    width: 450px
    height: 450px
    padding: 2%
    border-radius: 10px
    align-items: center
    justify-content: center

    .default-img
      display: flex
      width: 400px
      height: 400px
      align-items: center
      justify-content: center
      background-color: #eeeeee
</style>
