<template>
  <h2>{{ text }}</h2>
  <div class="cards">
    <default-card class="card"/>
    <product-card v-for="[ id, product ]  in useProductsStore().products"
                  :key="id"
                  :id="id"
                  :name="product.name"
                  :images="product.images"
                  :price="product.price"
                  :stock="product.stock"
                  :discount="product.discount"/>
  </div>
</template>

<script setup lang="ts">
import DefaultCard from "@/components/DefaultCard.vue";
import { useRoute } from "vue-router";
import { useProductsStore } from "@/store/products";
import ProductCard from "@/components/ProductCard.vue";

const route = useRoute()
const { text } = route.params

useProductsStore().loadAll(0, 30)
</script>


<style scoped lang="sass">
.cards
  gap: 2rem 1rem
  display: flex
  flex-wrap: wrap
  justify-content: center

</style>
