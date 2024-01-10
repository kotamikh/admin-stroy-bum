<template>
  <v-list class="subcategories">
    <v-btn
        @click="subCategoryDialog = true"
        prepend-icon="mdi-plus"
        variant="outlined"
        width="fit-content"
        style="border: 2px solid var(--dark-blue); background-color: #A5B5CC4D"
    >Добавить подкатегорию</v-btn>
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
    <v-list-item v-for="childSubject in props.childrenSubjects"
                 :key="childSubject.id"
                 :id="childSubject.id"
                 class="sub-category"
                 @click="openCategory(childSubject)"
    >
      <template v-slot:prepend>
        <img
            :src="childSubject.image"
            alt="img"
            style="height: 80px; width: 120px; object-fit: cover"
        />
      </template>
      <div style="display: flex; gap: 20px; justify-content: center">
        <p class="text">{{ childSubject.name }}</p>
        <v-btn
            size="small"
            variant="plain"
            class="delete-btn hidden"
            @click.stop="confirmDelete(childSubject.id)"
        >
          <v-icon icon="mdi-delete"
          />
        </v-btn>
      </div>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { ISubject, ISubjectDto } from "@/types/subjectBrand";
import GalleryDialog from "@/components/GalleryDialog.vue";
import { useSubjectsBrandsStore } from "@/store/subjects-brands";
import { useProductsStore } from "@/store/products";
import router from "@/router";

const route = useRoute()
const props = defineProps(['childrenSubjects'])
const subjectId = Number(route.params.subjectId)

const subject = reactive<ISubjectDto>({
  name: "",
  image: "",
  parentId: subjectId
})

const subCategoryDialog = ref(false)
const imageDialog = ref(false)
const imageDialogFolderName = 'Изображения подкатегорий'

const onUpdateImages = (data: { images: Array<string> }) => {
  if (data.images.length !== 0) {
    subject.image = JSON.parse(JSON.stringify(data)).images[0]
  }
  else {
    alert('Выберите изображение')
  }
}

const insertCategory = () => {
  useSubjectsBrandsStore().insertSubject(subject).then(() => useSubjectsBrandsStore().findSubjectsByParent(subject.parentId))
  subCategoryDialog.value = false
  resetInputs()
}

const resetInputs = () => {
  subject.name = ""
  subject.image = ""
}

const openCategory = async (subject: ISubject) => {
  await useSubjectsBrandsStore().findSubjectsByParent(subject.id)
  await useProductsStore().loadAllWithParams(0, 100, subject.id)
  await router.push({ name: 'Category', params: { subjectId: subject.id }})
}

const confirmDelete = (id: number) => {
  let confirmation = confirm("Хотите удалить эту категорию?")
  if (confirmation) {
    useSubjectsBrandsStore().deleteSubject(id).then(() => useSubjectsBrandsStore().findSubjectsByParent(subject.parentId))
  }
}
</script>

<style scoped lang="sass">
.sub-category
  width: 400px
  height: 100px
  cursor: pointer
  margin: 20px 0

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
