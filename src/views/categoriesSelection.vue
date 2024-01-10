<template>
  <h2>Выбор категории</h2>
  <v-list class="categories">
    <v-btn
        @click="categoryDialog = true"
        prepend-icon="mdi-plus"
        variant="outlined"
        width="fit-content"
        style="border: 2px solid var(--dark-blue); background-color: #A5B5CC4D"
    >Добавить категорию
    </v-btn>
    <v-dialog width="500" v-model="categoryDialog">
      <v-card>
        <v-card-text class="d-flex justify-space-between align-center">
          <v-btn variant="tonal"
                 class="mr-4"
                 @click="imageDialog = true"
          >
            <v-icon icon="mdi-paperclip"/>
          </v-btn>
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
        v-for="subject in useSubjectsBrandsStore().parentalSubjects"
        :key="subject.id"
        :id="subject.id"
        :name="subject.name"
        :image="subject.image"
        :category="subject"
        width="300px"
        height="80px"
        class="category"
        @click="openCategory(subject)"
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
        >
          <v-icon icon="mdi-delete"
          />
        </v-btn>
      </div>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "@/router";
import { reactive } from "vue";
import GalleryDialog from "@/components/GalleryDialog.vue";
import { ISubject, ISubjectDto } from "@/types/subjectBrand";
import { useSubjectsBrandsStore } from "@/store/subjects-brands";
import { useProductsStore } from "@/store/products";

const subject = reactive<ISubjectDto>({
  name: "",
  image: "",
  parentId: 0
})

const categoryDialog = ref(false)
const imageDialog = ref(false)
const imageDialogFolderName = 'Изображения категорий'

const onUpdateImages = (data: { images: Array<string> }) => {
  if (data.images.length !== 0) {
    subject.image = JSON.parse(JSON.stringify(data)).images[0]
  } else {
    alert('Выберите изображение')
  }
}

const insertCategory = () => {
  useSubjectsBrandsStore().insertSubject(subject).then(() => useSubjectsBrandsStore().findSubjectsByParent(0))
  categoryDialog.value = false
  resetInputs()
}

const resetInputs = () => {
  subject.name = ""
  subject.image = ""
}

const confirmDelete = (id: number) => {
  let confirmation = confirm("Хотите удалить эту категорию?")
  if (confirmation) {
    useSubjectsBrandsStore().deleteSubject(id).then(() => useSubjectsBrandsStore().loadAllSubjects())
  }
}

const openCategory = async (subject: ISubject) => {
  await useProductsStore().loadAllWithParams(0, 100, subject.id)
  await router.push({ name: 'Category', params: { subjectId: subject.id }})
}
</script>

<style scoped lang="sass">
.categories
  gap: 20px
  display: flex
  flex-wrap: wrap
  max-height: 500px
  flex-direction: column

  .category
    display: flex
    border-radius: 5px

    .text
      font-size: 18px
      font-weight: bold
      transition: all 0.1s ease
      background-color: transparent

    .hidden
      top: 0
      right: -52px
      height: 100%
      position: absolute
      visibility: hidden
      border: 1px solid var(--dark-blue)

    &:hover
      background-color: rgba(165, 181, 204, 0.3)

      .hidden
        opacity: 100%
        visibility: visible
</style>
