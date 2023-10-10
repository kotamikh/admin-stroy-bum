<template>
  <div class="product-card">
    <div class="main-information">
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
                  v-if="product.images.length === 0"
                  v-for="img in 3"
                  :key="img"
                  class="default-img"
                  style="background-color: #eeeeee"
              >
                <v-icon icon="mdi-camera" size="x-large"></v-icon>
              </div>
              <img
                  v-else
                  v-for="(image, index) in product.images"
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
        <div class="current-photo" @click="showDialog = true">
          <div v-if="product.images.length === 0" class="default-img">
            <v-icon icon="mdi-camera" size="100"></v-icon>
          </div>
          <v-img
              v-else
              class="image"
              :src="product.images[currentImageIndex]"
          />
        </div>
        <gallery-dialog
            v-model="showDialog"
            @update:show="showDialog = false"
            :product-images="product.images"
            @update:images="onUpdateImages"
        />
      </div>
      <div class="product-information">
        <v-text-field
            label="Наименование товара"
            variant="underlined"
            color="#E3DD5F"
            hide-details
            v-model="product.name"
        />
        <v-select
            label="Имя бренда"
            :items="useCategoriesBrandsStore().brands"
            v-model="product.brand_id"
            item-title="name"
            item-value="id"
            variant="underlined"
            color="#E3DD5F"
        >
          <template #append>
            <v-btn variant="tonal"
                   @click="dialog = true"
            >Добавить бренд
            </v-btn>
            <v-dialog width="500" v-model="dialog">
              <v-card>
                <v-card-text class="d-flex align-center">
                  <v-text-field label="Название бренда" v-model="brandName" variant="underlined"></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text="Готово" @click="insertBrand"></v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </v-select>
        <div class="stock">
          <v-select
              label="Наличие товара"
              :items="[
              { title: 'В наличии', value: 1 },
              { title: 'Под заказ', value: 0 },
            ]"
              variant="underlined"
              color="#E3DD5F"
              v-model="product.stock"
          />
        </div>
        <div class="price">
          <div class="current-price">
            <v-text-field
                label="Цена"
                variant="underlined"
                color="#E3DD5F"
                class="w-33"
                v-model.number="product.price"
            />
            <p>руб/шт.</p>
          </div>
          <v-checkbox
              label="Есть скидка"
              v-model="discountExist"
              hide-details
          />
          <div class="old-price" v-if="discountExist">
            <v-text-field
                label="Скидка"
                type="number"
                variant="underlined"
                color="#E3DD5F"
                class="discount"
                v-model.number="product.discount"
                hide-details
            >
              <p class="percent">%</p>
            </v-text-field>
            <p class="price-count">
              Старая цена:
              {{ Math.ceil((product.price / (100 - product.discount)) * 100) }}
              руб/шт.
            </p>
          </div>
        </div>
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
            v-model="product.description"
        ></v-text-field>
      </div>
    </div>
  </div>
  <v-btn
      color="#49AE66"
      variant="outlined"
      style="position: absolute; bottom: 50px; right: 140px; font-weight: bold"
      prepend-icon="mdi-check"
      @click="createCard"
  >Готово
  </v-btn>
</template>

<script setup lang="ts">
import { VNodeRef } from "@vue/runtime-core";
import { reactive, ref } from "vue";
import Characteristics from "@/components/Characteristics.vue";
import GalleryDialog from "@/components/GalleryDialog.vue";
import { IProduct, StockType } from "../../types/product";
import { useProductsStore } from "@/store/products";
import { useCategoriesBrandsStore } from "@/store/categories-brands";
import router from "@/router";
import * as path from "path";
import { useRoute } from "vue-router";

let currentProduct;
const route = useRoute();
let isEdit = false;

if (route.params.id) {
  console.log(route.params.id)
  isEdit = true;
  let productId = Number(route.params.id);
  currentProduct = JSON.parse(
      JSON.stringify(useProductsStore().products.get(productId))
  );
}

const subjectId = useCategoriesBrandsStore().findCategoryId(route.params.text.toString())

const product = reactive<IProduct>(
    Object.assign(
        {
          name: "",
          images: [],
          stock: StockType.InStock,
          price: 0,
          discount: 0,
          description: "",
          characteristics: [],
          subject_id: subjectId,
          brand_id: null
        },
        currentProduct
    )
);

const showDialog = ref(false);

const currentImageIndex = ref<number>(0);

const discountExist = ref(product.discount !== 0)

const isCurrent = (index: number) => {
  return index === currentImageIndex.value;
};

const track: VNodeRef = ref<VNodeRef | undefined>();
const trackTranslate = ref(0);

const countLimit = () => {
  return -(product.images.length - 3) * 140;
};

const moveToTop = () => {
  if (trackTranslate.value < 0) {
    trackTranslate.value += 140;
    track.value.style.transform = `translateY(${ trackTranslate.value }px)`;
  }
};

const moveToDown = () => {
  if (trackTranslate.value > countLimit()) {
    trackTranslate.value -= 140;
    track.value.style.transform = `translateY(${ trackTranslate.value }px)`;
  }
};

const onUpdateImages = (data: Array<string>) => {
  product.images = JSON.parse(JSON.stringify(data)).data;
};

const dialog = ref(false);
const brandName = ref("");

const insertBrand = () => {
  if (brandName.value) {
    useCategoriesBrandsStore().insertBrand(brandName.value)
    dialog.value = false
    brandName.value = ""
    console.log(useCategoriesBrandsStore().brands)
  }
}

useCategoriesBrandsStore().getAllBrands()

const createCard = () => {
  console.log(product)
  useProductsStore().insertCard(product, isEdit);
  router.push({ name: "Category", params: { text: route.params.text } });
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

      .stock
        width: 40%

      .current-price
        width: 30%
        display: flex
        align-items: center

      .old-price
        gap: 20px
        width: 70%
        display: flex
        position: relative
        align-content: flex-end

        .discount
          width: 25%
          max-width: 70px

        .percent
          right: 0
          position: absolute

        .price-count
          align-self: flex-end

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
