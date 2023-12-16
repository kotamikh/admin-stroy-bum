<template>
  <v-hover v-slot="{ isHovering, props: hoverProps }">
    <v-card v-bind="hoverProps"
            variant="outlined"
            style="border: 1px solid white">
      <div class="product-card">
        <div class="img-holder">
          <svg class="fav-mark" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 256 256">
            <path
              d="M240 98a57.63 57.63 0 0 1-17 41l-89.3 90.62a8 8 0 0 1-11.4 0L33 139a58 58 0 0 1 82-82.1l13 12.15l13.09-12.19A58 58 0 0 1 240 98Z"/>
          </svg>
          <div class="discount-mark" v-if="product.discount !== 0">- {{ product.discount }}%</div>
          <img :src="mainImage" class="product-img" alt="product-img"/>
        </div>
        <div class="price-stock">
          <div class="price">
            <p style="font-size: 1.2rem">{{ product.price }} <span class="rub">Р</span></p>
            <p v-if="product.discount !== 0" class="old-price">
              {{ countDiscount }}
              <span class="rub">Р</span></p>
          </div>
          <p class="stock">{{
              product.stock === 1 ? 'В наличии' : 'Под заказ'
            }}</p>
        </div>
        <p class="product-name">{{ product.name }}</p>
        <button class="cart-btn">В корзину</button>
      </div>
      <v-overlay :model-value="isHovering"
                 contained
                 scrim="var(--scrim)"
                 class="justify-center pt-16 font-weight-bold"
      >
        <div class="overlay-clue">
          <v-btn variant="flat"
                 color="var(--yellow)"
                 prepend-icon="mdi-lead-pencil"
                 @click="openCreationPage"
          >ИЗМЕНИТЬ
          </v-btn>
          <v-btn variant="flat"
                 color="white"
                 prepend-icon="mdi-trash-can-outline"
                 @click="confirmDelete(product.id)"
          >УДАЛИТЬ
          </v-btn>
        </div>
      </v-overlay>
    </v-card>
  </v-hover>
</template>

<script setup lang="ts">
import { computed } from "vue";
import defaultImg from '@/assets/default-image.jpeg'
import { useProductsStore } from "@/store/products";
import { IProduct, StockType } from "@/types/product";
import { useSubjectsBrandsStore } from "@/store/subjects-brands";
import router from "@/router";

export interface Props extends IProduct {
  product: {
    id: number,
    name: string,
    images: Array<string> | null,
    price: number,
    stock: StockType,
    discount: number,
    subject: number
  }
}

const props = withDefaults(defineProps<Props>(), {
  id: 0,
  name: 'unknown',
  images: () => [],
  price: 0,
  stock: StockType.OnOrder,
  discount: 0,
  subject: 0
})

const mainImage = computed(() => {
  if (props.product.images && props.product.images.length > 0) {
    return props.product.images[0]
  }
  return defaultImg
})

const countDiscount = computed(() => Math.ceil(props.product.price / (100 - props.product.discount) * 100))

const openCreationPage = () => {
  router.push({name: 'Creation', params: {subjectName: useSubjectsBrandsStore().findSubjectName(props.product.subject), id: props.product.id}})
}
const subjectId = props.product.subject
let productsLimit = 100

const confirmDelete = (id: number) => {
  let confirmation = confirm("Хотите удалить этот товар?")
  if (confirmation) {
     useProductsStore().deleteProduct(id).then(() => useProductsStore().loadAll(0, productsLimit, subjectId))
  }
}
</script>

<style scoped lang="sass">
.overlay-clue
  gap: 20px
  display: flex
  padding: 0 5px
  font-size: 18px
  border-radius: 2px
  flex-direction: column
  justify-content: space-evenly

*
  color: black

.product-card
  gap: 10px
  display: flex
  flex-direction: column

  padding: 10px
  width: 235px
  height: 395px
  cursor: pointer
  position: relative
  background-color: white

  .img-holder
    width: 100%
    display: flex
    min-height: 235px
    position: relative

    img
      width: 75%
      margin: auto
      max-height: 80%
      object-fit: contain

    &::after
      top: 0
      content: ''
      height: 100%
      width: 100%
      position: absolute
      border-radius: 15px
      background-color: rgba(0, 48, 120, 0.04)

    .discount-mark
      top: 3px
      left: 3px
      font-size: 14px
      padding: 3px 10px
      text-align: center
      position: absolute
      border-radius: 12px
      background-color: var(--yellow)

    .fav-mark
      top: 3px
      right: 3px
      cursor: pointer
      position: absolute
      fill: rgba(128, 128, 128, 0.4)

  .price-stock
    gap: 10px
    display: flex
    align-items: end

    .price
      gap: 10px
      display: flex

    .old-price
      font-size: 0.9rem
      color: var(--middle-grey)
      text-decoration: line-through

    p > .rub
      width: 0.5em
      color: inherit
      line-height: 0.2em
      display: inline-block
      vertical-align: middle
      text-decoration: inherit
      border-bottom: 0.07em solid

    .stock
      font-size: 0.85rem
      font-weight: lighter

  .product-name
    overflow: hidden
    font-weight: lighter
    display: -webkit-box
    -webkit-line-clamp: 2
    -webkit-box-orient: vertical

  .cart-btn
    border: none
    cursor: pointer
    margin-left: auto
    margin-top: auto
    padding: 5px 20px
    color: var(--grey)
    width: fit-content
    border-radius: 12px
    background-color: var(--yellow)
</style>
