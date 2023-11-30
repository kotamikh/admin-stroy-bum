<template>
    <h2>Выбор категории</h2>
    <v-list class="categories">
      <v-btn
        @click="categoryDialog = true"
        prepend-icon="mdi-plus"
        variant="outlined"
        width="fit-content"
        style="border: 2px solid var(--dark-blue); background-color: #A5B5CC4D"
        >Добавить категорию</v-btn>
      <v-dialog width="500" v-model="categoryDialog">
        <v-card>
          <v-card-text class="d-flex justify-space-between align-center">
              <v-btn variant="tonal"
                     class="mr-4"
                     @click="imageDialog = true"
              ><v-icon icon="mdi-paperclip"/></v-btn>
            <v-img v-if="category.image"
            :src="category.image"
            width="20px"
            class="mr-4"
            ></v-img>
            <gallery-dialog
              v-model="imageDialog"
              @update:show="imageDialog = false"
              :category-image="category.image"
              :limit="1"
              @update:images="onUpdateImages"
            />
            <v-text-field
              style="width: 60%"
              label="Название категории"
              v-model="category.name"
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
        v-for="[id, category] in useCategoriesBrandsStore().categoriesMap"
        :key="id"
        :id="category.id"
        :name="category.name"
        :image="category.image"
        :category="category"
        width="300px"
        height="80px"
        class="category"
        @click="selectCategory(category)"
      >
        <template v-slot:prepend>
          <img
            :src="category.image"
            alt="img"
            style="width: 3rem; margin-right: 10px"
          />
        </template>
        <div style="display: flex; gap: 20px">
          <p class="text">{{ category.name }}</p>
          <v-btn
            size="small"
            variant="plain"
            class="delete-btn hidden"
            @click.stop="confirmDelete(category.id)"
            ><v-icon icon="mdi-delete"
          /></v-btn>
        </div>
      </v-list-item>
    </v-list>
</template>

<script setup lang="ts">
import { useCategoriesBrandsStore } from "@/store/categories-brands";
import { ref } from "vue";
import router from "@/router";
import GalleryDialog from "@/components/GalleryDialog.vue";
import { reactive } from "vue";
import { ICategory, ICategoryDto } from "../../types/categoryBrand";

const category = reactive<ICategoryDto>({
  name: "",
  image: ""
})

const onUpdateImages = (data: string) => {
  if (JSON.parse(JSON.stringify(data)).data.length === 1) {
    category.image = JSON.parse(JSON.stringify(data)).data[0]
  }
  else {
   alert('Выберите одно изображение')
  }
};

const categoryDialog = ref(false);
const imageDialog = ref(false)

const insertCategory = () => {
  useCategoriesBrandsStore().insertCategory(category);
  categoryDialog.value = false
  category.name = ""
  category.image = ""
};

useCategoriesBrandsStore().loadAllSubjects();

const selectCategory = async (category: ICategory) => {
  await useCategoriesBrandsStore().getBrandsBySubject(category.id)
  await router.push({ name: 'Category', params: { text: category.name }})
}

const confirmDelete = (id: number) => {
  let confirmation = confirm("Хотите удалить эту категорию?")
  if (confirmation) {
    useCategoriesBrandsStore().deleteCategory(id)
  }
}

//   siding: {
//     text: "Сайдинг",
//     image: siding,
//     path: "siding",
//   },
//   additionalElements: {
//     text: "Доборные элементы сайдинга",
//     image: additionalElements,
//     path: "additionalElements",
//   },
//   decking: {
//     text: "Террасная доска",
//     image: decking,
//     path: "decking",
//   },
//   facadePanels: {
//     text: "Фасадные панели",
//     image: facadePanels,
//     path: "facadePanels",
//   },
//   windowSills: {
//     text: "Подоконники",
//     image: windowSills,
//     path: "windowSills",
//   },
//   roof: {
//     text: "Кровля",
//     image: roof,
//     path: "roof",
//   },
//   batteryScreens: {
//     text: "Декоративные экраны для батарей",
//     image: batteryScreens,
//     path: "batteryScreens",
//   },
//   insulation: {
//     text: "Утеплители",
//     image: insulation,
//     path: "insulation",
//   },
//   ceilings: {
//     text: "Подвесные потолки",
//     image: ceilings,
//     path: "ceilings",
//   },
//   foamSealant: {
//     text: "Пена герметики, пистолеты",
//     image: foamSealant,
//     path: "foamSealant",
//   },
//   waterDisposal: {
//     text: "Водосточные системы",
//     image: waterDisposal,
//     path: "waterDisposal",
//   },
//   other: {
//     text: "Прочее",
//     image: other,
//     path: "other",
//   },
// };
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
      z-index: 9999
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
