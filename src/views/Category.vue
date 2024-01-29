<template>
  <router-view>
    <h2>{{ subject.name }}</h2>
    <sub-categories :childrenSubjects="useSubjectsBrandsStore().findChildrenSubjects(subject.children)"></sub-categories>
    <v-btn variant="flat" prepend-icon="mdi-plus" color="#FFDF3C" class="mb-8"
           @click.stop="router.push({name: 'Creation', params: { subjectId: subjectId }})">ДОБАВИТЬ ТОВАР
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
import { onMounted, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useProductsStore } from "@/store/products";
import { useCurrencyStore } from "@/store/currency";
import SubCategories from "@/views/subCategories.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useSubjectsBrandsStore } from "@/store/subjects-brands";
import { ISubjectExtended } from "@/types/subjectBrand";
import { useSubjectsBrandsApi } from "@/api/subjects-brands";

const route = useRoute()
let productsLimit = useProductsStore().getProductNumber()
let subjectId = ref<number>(0)
const subject = ref<ISubjectExtended>(useSubjectsBrandsApi().getDefaultSubject())

watchEffect(() => {
  subjectId.value = Number(route.params.subjectId)
  subject.value = useSubjectsBrandsStore().findSubjectById(subjectId.value)
  useProductsStore().loadAllWithParams(0, productsLimit, subjectId.value)
})

if (subjectId.value) {
  onMounted(() => {
    useProductsStore().loadAllWithParams(0, productsLimit, subjectId.value)
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
