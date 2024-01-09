<template>
  <h2>Выбор подкатегории</h2>
  <v-list class="subcategories">
    <v-btn
        @click="subCategoryDialog = true"
        prepend-icon="mdi-plus"
        variant="outlined"
        width="fit-content"
        style="border: 2px solid var(--dark-blue); background-color: #A5B5CC4D"
    >Добавить категорию</v-btn>
    <v-dialog width="500" v-model="subCategoryDialog">
      <v-card>
        <v-card-text class="d-flex justify-space-between align-center">
          <v-btn variant="tonal"
                 class="mr-4"
                 @click="imageDialog = true"
          ><v-icon icon="mdi-paperclip"/></v-btn>
          <v-img v-if="subject.image"
                 :src="subject.image"
                 width="20px"
                 class="mr-4"
          ></v-img>
          <gallery-dialog
              v-model="imageDialog"
              :limit="1"
              :category-image="subject.image"
              :folderName="imageDialogFolderName"
              @update:images="onUpdateImages"
              @update:show="imageDialog = false"
          />
          <v-text-field
              style="width: 60%"
              label="Название категории"
              v-model="subject.name"
              @keyup.enter="insertCategory"
              variant="underlined"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Готово" @click="insertCategory"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-list-item
        v-for="[id, subject] in useSubjectsBrandsStore().subjectsMap"
        :key="id"
        :id="subject.id"
        :name="subject.name"
        :image="subject.image"
        :category="subject"
        width="300px"
        height="80px"
        class="category"
        @click="selectCategory(subject)"
    >
      <template v-slot:prepend>
        <img
            :src="subject.image"
            alt="img"
            style="width: 3rem; margin-right: 10px"
        />
      </template>
      <div style="display: flex; gap: 20px">
        <p class="text">{{ subject.name }}</p>
        <v-btn
            size="small"
            variant="plain"
            class="delete-btn hidden"
            @click.stop="confirmDelete(subject.id)"
        ><v-icon icon="mdi-delete"
        /></v-btn>
      </div>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">

import { useSubjectsBrandsStore } from "@/store/subjects-brands";
import GalleryDialog from "@/components/GalleryDialog.vue";
</script>

<style scoped lang="sass">

</style>
