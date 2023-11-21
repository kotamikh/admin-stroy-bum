<template>
  <router-view>
    <h2>{{ text }}</h2>
    <v-btn variant="flat" prepend-icon="mdi-plus" color="#E3DD5F" class="mb-8"
           @click.stop="router.push({name: 'Creation', params: { text: text }})">ДОБАВИТЬ ТОВАР
    </v-btn>
    <div class="cards">
      <product-card
        v-for="[id, product] in useProductsStore().productsMap"
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
import { useRoute } from "vue-router";
import { useProductsStore } from "@/store/products";
import ProductCard from "@/components/ProductCard.vue";
import { useCategoriesBrandsStore } from "@/store/categories-brands";
import router from "@/router";

const route = useRoute()

const text = route.params.text.toString()
useCategoriesBrandsStore().findCategoryId(text).then((categoryId) => {
  useProductsStore().loadAll(0, 30, categoryId)
})
</script>

<style scoped lang="sass">
.cards
  gap: 2rem 1rem
  display: flex
  flex-wrap: wrap
</style>
