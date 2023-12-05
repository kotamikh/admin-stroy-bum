<template>
  <div class="layout">
    <div class="header">
      <div class="title">
        <h1><span class="logo">Строй<span>Бум</span></span> | Страница администратора</h1>
      </div>
      <v-btn
          class="button"
          variant="outlined"
          style="border: 2px solid #a5b5cc; background-color: #A5B5CC4D"
          append-icon="mdi-exit-to-app">Выйти
      </v-btn>
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
@import url('https://fonts.cdnfonts.com/css/russo-one')

.layout
  width: 80%
  margin: 30px auto

  .header
    display: flex
    justify-content: space-between

    h1
      font-weight: normal
      color: var(--middle-grey)
      font-size: calc((100vw - 320px) / (1280 - 320) * (20 - 18) + 18px)

    .title
      gap: 10px
      display: flex
      align-items: center

      .logo
        color: #9E9E9E
        font-family: 'Russo One', sans-serif
        font-size: calc((100vw - 320px) / (1280 - 320) * (24 - 20) + 20px)

        @media screen and (max-width: 849px)
          margin-right: 20px

        span
          color: var(--yellow)
          font-family: 'Russo One', sans-serif
          text-shadow: 1px 0 #9B9B9B, -1px 0 #9B9B9B, 0 1px #9B9B9B, 0 -1px #9B9B9B, 1px 1px #9B9B9B, -1px -1px #9B9B9B, 1px -1px #9B9B9B, -1px 1px #9B9B9B
</style>
