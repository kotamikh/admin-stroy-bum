<template>
  <router-view>
    <h2>{{ subjectName }}</h2>
    <sub-categories :childrenSubjects="useSubjectsBrandsStore().childrenSubjects"></sub-categories>
    <v-btn variant="flat" prepend-icon="mdi-plus" color="#FFDF3C" class="mb-8"
           @click.stop="router.push({name: 'Creation', params: { subjectName: subjectName }})">ДОБАВИТЬ ТОВАР
    </v-btn>
    <div class="cards">
      <product-card
          v-for="[id, product] in useProductsStore().currentProducts"
          :key="id"
          :product="{...product}"
      />
    </div>
  </router-view>
</template>

<script setup lang="ts">
import router from "@/router";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useProductsStore } from "@/store/products";
import { useCurrencyStore } from "@/store/currency";
import SubCategories from "@/views/subCategories.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useSubjectsBrandsStore } from "@/store/subjects-brands";

const route = useRoute()
let productsLimit = useProductsStore().getProductNumber()
let subjectName = ref(route.params.subjectName.toString())

if (subjectName) {
  const subjectId = useSubjectsBrandsStore().findSubjectId(subjectName.value)
  onMounted(() => {
    useSubjectsBrandsStore().findSubjectsByParent(subjectId)
    useProductsStore().loadAllWithParams(0, productsLimit, subjectId)
  })
}

useCurrencyStore().loadAllCurrencies()
</script>

<style scoped lang="sass">
.cards
  gap: 2rem 1rem
  display: flex
  flex-wrap: wrap
</style>
