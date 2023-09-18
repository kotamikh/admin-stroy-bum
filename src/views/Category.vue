<template>
  <h2>Категория</h2>
  <v-row>
    <v-hover v-slot="{ isHovering, props }">
      <v-col class="add-img"
             cols="3"
             @click="open"
             v-bind="props"
      >

        <product-card>
          <v-overlay :model-value="isHovering"
                     contained
                     scrim="rgb(150, 150, 150)"
                     class="justify-center font-weight-bold pt-15"
          ><p style="font-size: 18px">Добавить товар</p>
          </v-overlay>
        </product-card>
      </v-col>
    </v-hover>
  </v-row>
</template>

<script setup lang="ts">

import ProductCard from "@/components/ProductCard.vue";
</script>


<style scoped lang="sass">

</style>
