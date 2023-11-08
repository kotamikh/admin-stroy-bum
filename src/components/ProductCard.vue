<template>
  <v-hover v-slot="{ isHovering, props: hoverProps }">
    <v-card v-bind="hoverProps"
            variant="outlined"
            style="border: 1px solid white">
      <div class="product-card">
        <div class="img-holder">
          <svg class="fav-mark"
               xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 256 256">
            <path
              d="M223 57a58.07 58.07 0 0 0-81.92-.1L128 69.05l-13.09-12.19A58 58 0 0 0 33 139l89.35 90.66a8 8 0 0 0 11.4 0L223 139a58 58 0 0 0 0-82Zm-11.35 70.76L128 212.6l-83.7-84.92a42 42 0 0 1 59.4-59.4l.2.2l18.65 17.35a8 8 0 0 0 10.9 0l18.65-17.35l.2-.2a42 42 0 1 1 59.36 59.44Z"/>
          </svg>
          <div class="discount-mark" v-if="discount !== 0">- {{ discount }}%</div>
          <img :src="mainImage" class="product-img" alt="product-img"/>
        </div>
        <div class="price-stock">
          <div class="price">
            <p style="font-size: 1.2rem">{{ price }} <span class="rub">Р</span></p>
            <p v-if="discount !== 0" class="old-price">
              {{ countDiscount }}
              <span class="rub">Р</span></p>
          </div>
          <p class="stock">{{
              props.stock === 1 ? 'В наличии' : 'Под заказ'
            }}</p>
        </div>
        <p class="product-name">{{ name }}</p>
        <button class="cart-btn">В корзину</button>
      </div>
      <v-overlay :model-value="isHovering"
                 contained
                 scrim="#C8C8C8B3"
                 class="justify-center pt-16 font-weight-bold"
      >
        <div class="overlay-clue">
          <v-btn variant="flat"
                 color="#E3DD5F"
                 prepend-icon="mdi-lead-pencil"
                 :to="{name: 'Creation', params: {text: props.categoryName, id: props.id}}"
          >ИЗМЕНИТЬ
          </v-btn>
          <v-btn variant="flat"
                 color="8C8C8CFF"
                 prepend-icon="mdi-trash-can-outline"
                 @click="confirmDelete(id)"
          >УДАЛИТЬ
          </v-btn>
        </div>
      </v-overlay>
    </v-card>
  </v-hover>
</template>

<script setup lang="ts">
import { IProduct, StockType } from "../../types/product";
import { computed } from "vue";
import defaultImg from '@/assets/default-image.jpeg'
import { useProductsStore } from "@/store/products";

export interface Props extends IProduct {
  id: number,
  name: string,
  images: Array<string>,
  price: number,
  stock: StockType,
  discount: number,
  categoryName: string
}

const props = withDefaults(defineProps<Props>(), {
  id: 0,
  name: 'unknown',
  images: () => [],
  price: 0,
  stock: StockType.OnOrder,
  discount: 0,
  categoryName: 'unknown'
});

const mainImage = props.images.length === 0 ? defaultImg : props.images[0]
const countDiscount = computed(() => Math.ceil(props.price / (100 - props.discount) * 100))

const confirmDelete = (id: number) => {
  let confirmation = confirm("Хотите удалить этот товар?")
  if (confirmation) {
    useProductsStore().deleteCard(id)
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
      background-color: #E3DD5F

    .fav-mark
      top: 3px
      right: 3px
      cursor: pointer
      position: absolute
      fill: #808080

  .price-stock
    gap: 10px
    display: flex
    align-items: end

    .price
      gap: 10px
      display: flex

    .old-price
      font-size: 0.9rem
      color: #808080
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
    color: #555555
    width: fit-content
    border-radius: 12px
    background-color: #E3DD5F
</style>
