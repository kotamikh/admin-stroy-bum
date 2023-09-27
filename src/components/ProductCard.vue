<template>
  <v-hover v-slot="{ isHovering, props: hoverProps }">
    <v-card v-bind="hoverProps"
            variant="outlined"
            style="border: 1px solid white">
      <div @click="goToProductPage"
           class="product-card">
        <div class="marks">
          <svg class="fav-mark" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 256 256">
            <path
              d="M223 57a58.07 58.07 0 0 0-81.92-.1L128 69.05l-13.09-12.19A58 58 0 0 0 33 139l89.35 90.66a8 8 0 0 0 11.4 0L223 139a58 58 0 0 0 0-82Zm-11.35 70.76L128 212.6l-83.7-84.92a42 42 0 0 1 59.4-59.4l.2.2l18.65 17.35a8 8 0 0 0 10.9 0l18.65-17.35l.2-.2a42 42 0 1 1 59.36 59.44Z"/>
          </svg>
          <div class="discount-mark" v-if="discount !== 0">скидка {{ discount }}%</div>
        </div>
        <div class="img-holder">
          <img :src="mainImage" class="product-img" alt="product-img"/>
        </div>
        <div class="name-stock">
          <p class="product-name">{{ name }}</p>
          <p :class="`${props.stock === 1 ? 'in-stock' : 'on-order'}`">{{
              props.stock === 1 ? 'В наличии' : 'Под заказ'
            }}</p>
        </div>
        <div class="price-cart">
          <div class="price">
            <p v-if="discount !== 0" style="text-decoration: line-through; font-size: 0.9rem">{{ countDiscount }}
              руб/шт.</p>
            <p style="color: #E3DD5F; font-weight: bold">{{ price }} руб/шт.</p>
          </div>
          <button class="cart-btn">В корзину</button>
        </div>
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
                 :to="`/creation/${product.id}`"
          >ИЗМЕНИТЬ</v-btn>
          <v-btn variant="flat"
                 color="8C8C8CFF"
                 prepend-icon="mdi-trash-can-outline"
                 @click="useProductsStore().deleteCard(id)"
          >УДАЛИТЬ</v-btn>
        </div>
      </v-overlay>
    </v-card>
  </v-hover>
</template>

<script setup lang="ts">
import { IProduct, StockType } from "../../types/product";
import { computed } from "vue";
import { useRouter } from "vue-router";
import defaultImg from '@/assets/default-image.jpeg'
import { useProductsStore } from "@/store/products";

export interface Props extends IProduct {
  product: IProduct,
  id: number,
  name: string,
  images: Array<string>,
  price: number,
  stock: StockType,
  discount: number
}

const props = withDefaults(defineProps<Props>(), {
  id: 0,
  name: 'unknown',
  images: () => [],
  price: 0,
  stock: StockType.OnOrder,
  discount: 0
});

const mainImage = props.images.length === 0 ? defaultImg : props.images[0]
const countDiscount = computed(() => Math.ceil(props.price / (100 - props.discount) * 100))

const router = useRouter()
const goToProductPage = () => {
  router.push({
    path: "product/" + props.id,
  })
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

.product-card
  display: flex
  flex-direction: column

  width: 260px
  height: 355px
  padding: 10px 0
  position: relative

  .marks
    left: 0
    padding: 2px
    position: absolute

    width: 100%
    display: flex
    align-items: center
    box-sizing: border-box
    flex-direction: row-reverse
    justify-content: space-between

    .discount-mark
      padding: 0 5px
      border-radius: 5%
      font-size: 0.9rem
      color: #555555
      height: fit-content
      background-color: #E3DD5F

    .fav-mark
      fill: #808080

      &:hover
        fill: #E3DD5F

  .img-holder
    width: 100%
    height: 200px
    display: flex
    padding: 0 30px
    align-items: center
    justify-content: center

    img
      width: inherit
      object-fit: contain

  .name-stock
    margin: 10px

    .product-name
      overflow: hidden
      display: -webkit-box
      -webkit-line-clamp: 2
      -webkit-box-orient: vertical

  p.in-stock
    font-weight: bold
    color: #49AE66

  .price-cart
    display: flex
    margin-top: auto
    align-items: flex-end
    justify-content: space-evenly

    .cart-btn
      border: none
      cursor: pointer
      padding: 5px 10px
      color: #555555
      min-width: 40%
      border-radius: 5px
      background-color: #E3DD5F
</style>
