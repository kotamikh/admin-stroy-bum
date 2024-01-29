<template>
  <h2>Выбор категории</h2>
  <v-btn
    @click="categoryDialog = true"
    prepend-icon="mdi-plus"
    variant="outlined"
    width="fit-content"
    style="border: 2px solid var(--dark-blue); background-color: #A5B5CC4D; margin-bottom: 20px"
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
  <v-list class="categories">
    <div v-for="subject in useSubjectsBrandsStore().findParentalSubjects()"
         :key="subject.id"
         class="category"
         @click="openCategory(subject)"
    >
      <div class="category-information">
        <img
          :src="subject.image"
          alt="img"
          style="width: 3rem; margin-right: 10px"
        />
        <p class="text">{{ subject.name }}
          <v-btn
            size="small"
            variant="plain"
            class="delete-btn"
            @click.stop="confirmDelete(subject.id)"
          >
            <v-icon icon="mdi-delete" class="ma-auto"
            />
          </v-btn>
        </p>
        <v-list v-if="subject.children.length > 0" class="children-categories">
          <v-list-item v-for="child in useSubjectsBrandsStore().findChildrenSubjects(subject.children)"
                       class="child"
                       @click.stop="openCategory(child)"
          >{{ child.name }}
          </v-list-item>
        </v-list>
      </div>
    </div>
  </v-list>
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "@/router";
import { reactive } from "vue";
import { useProductsStore } from "@/store/products";
import GalleryDialog from "@/components/GalleryDialog.vue";
import { ISubject, ISubjectDto } from "@/types/subjectBrand";
import { useSubjectsBrandsStore } from "@/store/subjects-brands";

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
  useSubjectsBrandsStore().insertSubject(subject)
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
  await router.push({ name: 'Category', params: { subjectId: subject.id } })
}
</script>

<style scoped lang="sass">
.categories
  display: grid
  height: fit-content
  grid-template-columns: repeat(2, 1fr)

  .category
    width: 320px

    .category-information
      display: grid
      padding: 10px
      border-radius: 5px
      align-items: center
      grid-template-columns: 1fr 4fr

      .text
        font-size: 18px
        font-weight: bold
        position: relative
        transition: all 0.1s ease
        background-color: transparent

        .delete-btn
          top: 50%
          left: 114%
          height: 64px
          display: flex
          position: absolute
          visibility: hidden
          transform: translate(-50%, -50%)
          border: 2px solid var(--dark-blue)

      &:hover
        background-color: rgba(165, 181, 204, 0.3)

        .delete-btn
          opacity: 100%
          visibility: visible

      .children-categories
        padding: 0
        grid-area: 2 / 2 / 3 / 6

        .v-list-item
          padding: 0 10px
          min-height: unset

        .child
          cursor: pointer

          &:hover
            background-color: var(--scrim)
</style>
