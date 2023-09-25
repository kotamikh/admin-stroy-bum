<template>
  <div class="product-card">
    <div class="main-information">
      <div class="product-images">
        <div class="gallery-wrapper">
          <button class="up-button"
                  @click="moveToTop"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path d="m12 10.8l-4.6 4.6L6 14l6-6l6 6l-1.4 1.4l-4.6-4.6Z"/>
            </svg>
          </button>
          <div class="slider-gallery">
            <div class="slider-track"
                 ref="track">
              <div v-if="productImages.length === 0"
                   v-for="img in 3"
                   :key="img"
                   class="default-img"
                   style="background-color: #eeeeee">
                <v-icon
                    icon="mdi-camera"
                    size="x-large"
                ></v-icon>
              </div>
              <img v-else
                   v-for="(image, index) in productImages"
                   :src="image"
                   :key="index"
                   alt="image"
                   :class="[{ current : isCurrent(index)  }, 'image' ]"
                   @click="currentImageIndex = index"

              />
            </div>
          </div>
          <button class="down-button"
                  @click="moveToDown">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
              <path d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4l-6 6Z"/>
            </svg>
          </button>
        </div>
        <div class="current-photo" @click="showDialog = true">
          <div v-if="productImages.length === 0"
               class="default-img">
            <v-icon
                icon="mdi-camera"
                size="100"
            ></v-icon>
          </div>
          <v-img v-else
                 class="image"
                 :src="productImages[currentImageIndex]"
          />
        </div>
        <gallery-dialog v-model="showDialog"
                        @update:show="showDialog = false"
                        :product-images="productImages"
                        @update:images="onUpdateImages"
        />
      </div>
      <div class="product-information">
        <div class="name">
          <v-text-field label="Наименование товара"
                        variant="underlined"
                        color="#E3DD5F"
                        v-model="product.name"/>
          <button class="fav-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256">
              <path fill="#808080"
                    d="M223 57a58.07 58.07 0 0 0-81.92-.1L128 69.05l-13.09-12.19A58 58 0 0 0 33 139l89.35 90.66a8 8 0 0 0 11.4 0L223 139a58 58 0 0 0 0-82Zm-11.35 70.76L128 212.6l-83.7-84.92a42 42 0 0 1 59.4-59.4l.2.2l18.65 17.35a8 8 0 0 0 10.9 0l18.65-17.35l.2-.2a42 42 0 1 1 59.36 59.44Z"/>
            </svg>
          </button>
        </div>
        <div class="stock">
          <v-select
              label="Наличие товара"
              :items="['В наличии', 'Под заказ']"
              variant="underlined"
              color="#E3DD5F"
              v-model="product.stock"/>
        </div>
        <div class="price">
          <div class="current-price">
            <v-text-field label="Цена"
                          variant="underlined"
                          color="#E3DD5F"
                          v-model="product.price"
            />
            <p>руб/шт.</p>
          </div>
          <v-checkbox label="Есть скидка"
                      v-model="enabled"
                      hide-details
          />
          <div class="old-price" v-if="enabled">
            <v-text-field label="Скидка"
                          variant="underlined"
                          color="#E3DD5F"
                          v-model="product.discount"
            />
            <p>руб/шт.</p>
          </div>
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
        <characteristics v-model="product.characteristics"/>
      </div>
      <div class="description">
        <h3>Описание:</h3>
        <v-text-field
            variant="filled"
            color="#E3DD5F"
            class="input-description"
            v-model="product.description"></v-text-field>
      </div>
    </div>
  </div>
  <v-btn
         color="#49AE66"
         variant="outlined"
         style="position: absolute; bottom: 50px; right: 140px; font-weight: bold"
         prepend-icon="mdi-check"
         @click="createNewCard"
  >Готово</v-btn>
</template>

<script setup lang="ts">
import { VNodeRef } from "@vue/runtime-core";
import { reactive, ref } from "vue";
import Characteristics from "@/components/Characteristics.vue";
import GalleryDialog from "@/components/GalleryDialog.vue";
import { IProduct, StockType } from "../../types/product";

const product = reactive<IProduct>({
  name: '',
  images: [],
  stock: StockType.OnOrder,
  price: 0,
  discount: 0,
  description: '',
  characteristics: []
})

const showDialog = ref(false)

const productImages = ref<Array<string>>([])
const currentImageIndex = ref<number>(0)

const isCurrent = (index: number) => {
  return index === currentImageIndex.value
}

const track: VNodeRef = ref<VNodeRef | undefined>()
const trackTranslate = ref(0)

const countLimit = () => {
  return -(productImages.value.length - 3) * 140
}

const moveToTop = () => {
  if (trackTranslate.value < 0) {
    trackTranslate.value += 140
    track.value.style.transform = `translateY(${ trackTranslate.value }px)`
  }
}

const moveToDown = () => {
  if (trackTranslate.value > countLimit()) {
    trackTranslate.value -= 140
    track.value.style.transform = `translateY(${ trackTranslate.value }px)`
  }
}

const enabled = ref(false)

const onUpdateImages = (data: Array<string>) => {
  productImages.value = JSON.parse(JSON.stringify(data)).data
}

const createNewCard = () => {
  console.log(JSON.parse(JSON.stringify(product)))
}
</script>

<style scoped lang="sass">
.product-card
  width: 100%
  margin: 70px auto

  .main-information
    display: flex
    color: #808080
    margin-bottom: 70px
    justify-content: space-between

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
            fill: #808080

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
              border: 1.5px solid rgba(128, 128, 128, 0.4)

      .current-photo
        display: flex
        width: 450px
        height: 450px
        padding: 2%
        border-radius: 10px
        align-items: center
        justify-content: center
        border: 2px solid rgba(128, 128, 128, 0.4)

        .default-img
          display: flex
          width: 400px
          height: 400px
          align-items: center
          justify-content: center
          background-color: #eeeeee

    .product-information
      gap: 10px
      width: 40%
      display: flex
      margin-top: 30px
      flex-direction: column

      .name
        display: flex

        .fav-btn
          border: none
          height: 32px
          padding: 0 10px
          background-color: transparent

      .stock,
      .price
        width: 40%

        .current-price,
        .old-price
          display: flex
          align-items: center

      .cart-btn
        gap: 5px
        border: none
        display: flex
        color: #808080
        padding: 5px 10px
        border-radius: 5px
        width: fit-content
        align-items: center
        margin: 10px 0
        background-color: #E3DD5F
        font-size: calc((100vw - 320px) / (1280 - 320) * (20 - 18) + 18px)

  .additional-information
    gap: 30px
    display: flex
    flex-direction: column

    h3
      margin-bottom: 20px

    .characteristics,
    .description
      font-size: calc((100vw - 320px) / (1280 - 320) * (18 - 16) + 16px)

      .input-description
        width: 100%
        height: 200px
</style>
