<template>
  <v-navigation-drawer expand-on-hover
                       rail
                       :width="300"
                       style="height: fit-content; top: 150px; left: -5px; border: 1px solid var(--dark-blue); border-radius: 7px"
                       class="position-absolute"
  >
    <v-list density="comfortable" nav>
      <v-list-item prepend-icon="mdi-plus-box-multiple" title="Добавить/удалить товары" :to="{name: 'Categories'}">
      </v-list-item>
      <v-list-item prepend-icon="mdi-image" title="Галерея изображений" :to="{name: 'Gallery'}" replace></v-list-item>
      <v-list-item prepend-icon="mdi-message" title="Заказы и сообщения"></v-list-item>
      <v-list-item prepend-icon="mdi-star-cog" title="Редактировать главную страницу"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
