<template>
  <div class="product-card">
    <div class="main-information">
      <div class="product-images">
        <div class="gallery-wrapper">
          <button @click="moveToTop">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path d="m12 10.8l-4.6 4.6L6 14l6-6l6 6l-1.4 1.4l-4.6-4.6Z"/>
            </svg>
          </button>
          <div class="slider-gallery">
            <div class="slider-track"
                 ref="track">
              <div v-for="image in 3"
                   :key="image"></div>
            </div>
          </div>
          <button @click="moveToDown">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4l-6 6Z"/>
            </svg>
          </button>
        </div>
        <div class="current-photo">
        </div>
      </div>
      <div class="name-price">
        <v-input>
          <button class="fav-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256">
              <path fill="#808080"
                    d="M223 57a58.07 58.07 0 0 0-81.92-.1L128 69.05l-13.09-12.19A58 58 0 0 0 33 139l89.35 90.66a8 8 0 0 0 11.4 0L223 139a58 58 0 0 0 0-82Zm-11.35 70.76L128 212.6l-83.7-84.92a42 42 0 0 1 59.4-59.4l.2.2l18.65 17.35a8 8 0 0 0 10.9 0l18.65-17.35l.2-.2a42 42 0 1 1 59.36 59.44Z"/>
            </svg>
          </button>
        </v-input>
        <p :class="`${product.stock === 1 ? 'in-stock' : 'on-order'}`">{{
            product.stock === 1 ? 'В наличии' : 'Под заказ'
          }}</p>
        <div class="price">
          <p v-if="product.discount !== 0" style="text-decoration: line-through; font-size: 0.9rem">{{ withoutDiscount }}
            руб/шт.
          </p>
          <p style="color: var(--yellow); font-weight: bold">{{ 500 }} руб/шт.</p>
        </div>
        <button class="cart-btn">
          В корзину
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256">
            <path fill="#808080"
                  d="M96 216a16 16 0 1 1-16-16a16 16 0 0 1 16 16Zm88-16a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm47.65-125.65l-28.53 92.71A23.89 23.89 0 0 1 180.18 184H84.07A24.11 24.11 0 0 1 61 166.59L24.82 40H8a8 8 0 0 1 0-16h16.82a16.08 16.08 0 0 1 15.39 11.6L48.32 64H224a8 8 0 0 1 7.65 10.35ZM213.17 80H52.89l23.49 82.2a8 8 0 0 0 7.69 5.8h96.11a8 8 0 0 0 7.65-5.65Z"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="additional-information">
      <div class="characteristics">
        <h2>Характеристики:</h2>
        <ul v-for="(characteristic, index) in product.characteristics"
            :key="index">
          <li>
            <p class="left">
              <span class="label">{{ characteristic[0] }}</span>
            </p>
            <span class="value">{{ characteristic[1] }}</span>
          </li>
        </ul>
      </div>
      <div class="description">
        <h2>Описание:</h2>
        <p>{{ product.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IProduct } from "~/types/Product";
import { useProductsStore } from "~/store/products";
import { VNodeRef } from "@vue/runtime-core";

const route = useRoute()
const store = useProductsStore()

const id = computed<number>(() => Number(route.params.id))
const product = ref<IProduct>(store.getDefaultProduct())

const result = await store.getProduct(id.value)
if (result.ok) {
  product.value = result.data
}

const withoutDiscount = computed(() => Math.ceil(500 / (100 - product.value.discount) * 100))

const currentImageIndex = ref<number>(0)
const currentImage = computed<string>(() => product.value.images[currentImageIndex.value] || store.getDefaultImage())

const setCurrentImage = (index: number) => {
  if (index < 0 || index >= product.value.images.length) return
  currentImageIndex.value = index
}

const isCurrent = (index: number) => {
  return currentImageIndex.value === index
}

const track: VNodeRef = ref<VNodeRef | undefined>()
const trackTranslate = ref(0)
const translateLimit = -(product.value.images.length - 3) * 140

const moveToTop = () => {
  if (trackTranslate.value < 0) {
    trackTranslate.value += 140
    track.value.style.transform = `translateY(${ trackTranslate.value }px)`
  }
}

const moveToDown = () => {
  if (trackTranslate.value > translateLimit) {
    trackTranslate.value -= 140
    track.value.style.transform = `translateY(${ trackTranslate.value }px)`
  }
}
</script>

<style scoped lang="sass">
.product-card
  width: 90%
  margin: 70px auto

  .main-information
    display: flex
    margin-bottom: 70px

    .product-images
      gap: 20px
      width: 60%
      height: 400px
      display: flex

      .gallery-wrapper
        width: 20%
        display: flex
        height: 400px
        position: relative

        .up-button,
        .down-button
          left: 50%
          border: none
          position: absolute
          background-color: transparent
          transform: translate(-50%, -50%)

          svg > path
            fill: #dadada

        .active
          svg > path
            fill: #808080

        .up-button
          top: -12px

        .down-button
          bottom: -60px

        .slider-gallery
          height: 400px
          overflow: hidden
          align-self: center

          .slider-track
            transition: all 0.2s ease

          img
            width: 100%
            height: 120px
            object-fit: cover
            margin-bottom: 20px
            border: 2px solid var(--middle-grey)

          .current
            border: 3px solid var(--yellow)

      .current-photo
        width: 400px
        height: 400px
        display: flex
        align-items: center
        border: 2px solid var(--middle-grey)

        img
          width: 100%
          height: 100%
          object-fit: contain

    .name-price
      gap: 20px
      display: flex
      margin-left: 50px
      flex-direction: column

      h1
        margin-bottom: 0
        position: relative

        .fav-btn
          border: none
          height: 32px
          padding: 0 10px
          position: absolute
          background-color: transparent

      p.in-stock
        font-weight: bold
        color: var(--green)

      .price p
        font-size: calc((100vw - 320px) / (1280 - 320) * (20 - 18) + 18px)

      .cart-btn
        gap: 5px
        border: none
        display: flex
        padding: 5px 10px
        border-radius: 5px
        width: fit-content
        align-items: center
        background-color: var(--yellow)
        font-size: calc((100vw - 320px) / (1280 - 320) * (20 - 18) + 18px)

  .additional-information
    gap: 30px
    display: flex
    flex-direction: column

    .characteristics,
    .description
      font-size: calc((100vw - 320px) / (1280 - 320) * (18 - 16) + 16px)

      ul
        position: relative

        .left
          width: 40%
          float: left
          overflow: hidden
          position: relative

          span.label
            font-weight: bold
            position: relative
            display: inline-block

            &:after
              content: ''
              bottom: 0
              left: 100%
              right: -500px
              position: absolute
              border-bottom: 1px dotted #888
</style>
