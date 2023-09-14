<template>
  <div class="first-line">
    <div class="header">
      <v-icon icon="mdi-account-cog-outline"
              size="x-large"
      />
      <h1>Страница администратора</h1>
    </div>
    <v-btn append-icon="mdi-exit-to-app">Выйти</v-btn>
  </div>
  <v-navigation-drawer expand-on-hover
                       rail
                       :width="300"
                       style="height: 170px; top: 150px"
                       class="position-absolute"
  >
    <v-list density="comfortable" nav>
      <v-list-item prepend-icon="mdi-plus-box-multiple" title="Добавить/удалить товары" value="myfiles" @click="router.push({path: '/products'})"></v-list-item>
      <v-list-item prepend-icon="mdi-message" title="Заказы и сообщения" value="shared"></v-list-item>
      <v-list-item prepend-icon="mdi-star-cog" title="Редактировать главную страницу" value="starred"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>

import router from "@/router";
</script>

<style lang="sass">
.first-line
  width: 80%
  display: flex
  margin: 30px auto
  justify-content: space-between

.header
  gap: 10px
  display: flex
  align-items: center

  h1
    font-size: 24px
</style>
