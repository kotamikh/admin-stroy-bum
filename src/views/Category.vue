<template>
  <router-view>
  <h2>{{ text }}</h2>
  <div class="cards">
    <default-card class="card" :category-name="text"/>
    <product-card
      v-for="[id, product] in useProductsStore().products"
      :key="id"
      :id="product.id"
      :name="product.name"
      :images="product.images"
      :price="product.price"
      :stock="product.stock"
      :discount="product.discount"
      :category-name="text"
    />
  </div>
  </router-view>
</template>

<script setup lang="ts">
import DefaultCard from "@/components/DefaultCard.vue";
import { useRoute } from "vue-router";
import { useProductsStore } from "@/store/products";
import ProductCard from "@/components/ProductCard.vue";
import { useCategoriesBrandsStore } from "@/store/categories-brands";

const route = useRoute()
const text = route.params.text.toString()
const categoryId = useCategoriesBrandsStore().findCategoryId(text)

useProductsStore().loadAll(0, 30, categoryId)
console.log(useProductsStore().products)
</script>

<style scoped lang="sass">
.cards
  gap: 2rem 1rem
  display: flex
  flex-wrap: wrap
  justify-content: center
</style>
