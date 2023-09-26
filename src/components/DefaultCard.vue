<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card v-bind="props"
            variant="outlined"
            class="product-card"
            style="border: 3px solid #eeeeee; border-radius: 0"
            @click="router.push('/creation')"
    >
      <div>
        <div class="marks">
          <svg class="fav-mark" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 256 256">
            <path
                d="M223 57a58.07 58.07 0 0 0-81.92-.1L128 69.05l-13.09-12.19A58 58 0 0 0 33 139l89.35 90.66a8 8 0 0 0 11.4 0L223 139a58 58 0 0 0 0-82Zm-11.35 70.76L128 212.6l-83.7-84.92a42 42 0 0 1 59.4-59.4l.2.2l18.65 17.35a8 8 0 0 0 10.9 0l18.65-17.35l.2-.2a42 42 0 1 1 59.36 59.44Z"/>
          </svg>
          <div class="discount-mark">скидка 15%</div>
        </div>
        <div class="img-holder">
          <img src="@/assets/add-img.avif" class="product-img" alt="product-img"/>
        </div>
        <div class="name-stock">
          <p class="product-name"></p>
          <p class="product-stock"></p>
        </div>
        <div class="price-cart">
          <div class="prices">
            <div class="price">
              <p></p>
              <div style="text-decoration: line-through; font-size: 0.9rem">руб/шт.</div>
            </div>
            <div class="price">
              <p></p>
              <div style="color: #E3DD5F; font-weight: bold">руб/шт.</div>
            </div>
          </div>
          <button class="cart-btn">В корзину</button>
        </div>
      </div>
      <v-overlay :model-value="isHovering"
                 contained
                 scrim="#C8C8C8B3"
                 class="justify-center align-center font-weight-bold"
      >
          <v-btn  variant="flat"
                  prepend-icon="mdi-plus"
                  color="#E3DD5F">ДОБАВИТЬ ТОВАР</v-btn>
      </v-overlay>
    </v-card>
  </v-hover>
</template>

<script setup lang="ts">

import router from "@/router";
</script>

<style scoped lang="sass">
.product-card
  display: flex
  padding: 10px 0
  position: relative
  flex-direction: column

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

  .img-holder
    width: 100%
    max-height: 200px
    display: flex
    padding: 0 30px
    align-items: center
    justify-content: center

    img
      height: 200px
      object-fit: contain

  .name-stock
    gap: 5px
    margin: 10px
    display: flex
    flex-direction: column

    .product-name
      width: 100px
      height: 25px
      border: 1px solid #C8C8C8B3

    .product-stock
      width: 150px
      height: 25px
      border: 1px solid #C8C8C8B3

  .price-cart
    gap: 10%
    display: flex
    margin-top: auto
    align-items: flex-end
    justify-content: space-evenly

    .prices
      gap: 5px
      display: flex
      flex-direction: column

      .price
        gap: 5px
        display: flex

        p
          width: 40px
          height: 25px
          border: 1px solid #C8C8C8B3

    .cart-btn
      border: none
      cursor: unset
      color: #555555
      padding: 5px 10px
      border-radius: 5px
      background-color: #E3DD5F
</style>
