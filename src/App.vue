<template>
  <v-app>
    <main-layout>
      <router-view></router-view>
    </main-layout>
  </v-app>
</template>

<script lang="ts" setup>
import MainLayout from "@/layouts/MainLayout.vue";
import { useProductsStore } from "@/store/products";
import { useSubjectsBrandsStore } from "@/store/subjects-brands";

let productsLimit = 100
useProductsStore().loadAll(0, productsLimit)
useSubjectsBrandsStore().loadAllSubjects()
useSubjectsBrandsStore().findSubjectsByParent(0)

window.onbeforeunload = function () {
  return "Перезагрузить сайт? Изменения могут не сохраниться"
}
</script>
