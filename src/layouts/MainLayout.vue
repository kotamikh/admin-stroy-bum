<template>
  <div class="layout">
    <div class="header">
      <div class="title">
        <v-icon icon="mdi-account-cog-outline"
                size="x-large"
        />
        <h1>Страница администратора</h1>
      </div>
      <v-btn append-icon="mdi-exit-to-app">Выйти</v-btn>
    </div>
    <navigation/>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">

import Navigation from "@/components/Navigation.vue";
</script>

<style scoped lang="sass">
.layout
  width: 80%
  margin: 30px auto

  .header
    display: flex
    justify-content: space-between

    .title
      gap: 10px
      display: flex
      align-items: center

      h1
        font-size: 24px
</style>
