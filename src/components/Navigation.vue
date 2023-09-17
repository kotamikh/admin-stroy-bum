<template>
  <v-navigation-drawer expand-on-hover
                       rail
                       style="height: fit-content; top: 150px"
                       class="position-absolute bg-blue-lighten-3"

  >
    <v-list density="comfortable" nav>
      <v-list-item prepend-icon="mdi-image" title="Галерея" :to="{path: '/gallery'}"></v-list-item>
      <v-list-item prepend-icon="mdi-plus-box-multiple" title="Добавить/удалить товары" :to="{path: '/products'}">
      </v-list-item>
      <v-list-item prepend-icon="mdi-message" title="Заказы и сообщения"></v-list-item>
      <v-list-item prepend-icon="mdi-star-cog" title="Редактировать главную страницу"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
</script>
