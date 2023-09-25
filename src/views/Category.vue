<template>
  <h2>{{ text }}</h2>
  <v-row>
    <v-col cols="3">
      <default-card/>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import DefaultCard from "@/components/DefaultCard.vue";
import { useRoute } from "vue-router";

const route = useRoute()
const { text } = route.params
</script>


<style scoped lang="sass">
</style>
