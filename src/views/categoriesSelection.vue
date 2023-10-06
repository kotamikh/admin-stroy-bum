<template>
    <h2>Выбор категории</h2>
    <v-list class="categories">
      <v-btn
        @click="dialog = true"
        prepend-icon="mdi-plus"
        variant="tonal"
        width="fit-content"
        >Добавить категорию</v-btn
      >
      <v-dialog width="500" v-model="dialog">
        <v-card>
          <v-card-text class="d-flex align-center">
            <v-btn variant="tonal" class="d-flex">
              <v-file-input
                class="fileInput d-flex justify-center"
                style="width: inherit"
              ></v-file-input>
            </v-btn>
            <v-text-field
              style="width: 70%; margin-left: 30px"
              label="Название категории"
              v-model="categoryName"
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
        v-for="category in useCategoriesBrandsStore().categories"
        :id="category.name"
        width="300px"
        height="80px"
        class="category"
        @click="selectCategory(category.name)"
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
            variant="tonal"
            class="hidden"
            @click="useCategoriesBrandsStore().deleteCategory"
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

const dialog = ref(false);
const categoryName = ref("");

const insertCategory = () => {
  dialog.value = false;
  useCategoriesBrandsStore().insertCategory(categoryName.value);
};

useCategoriesBrandsStore().getAllCategories();

const selectCategory = (categoryName: string) => {
  router.push({ name: 'Category', params: { text: categoryName }})
}
// import siding from "@/assets/categories/сайдинг.png";
// import additionalElements from "@/assets/categories/доборные элементы.png";
// import decking from "@/assets/categories/террасная доска.png";
// import facadePanels from "@/assets/categories/фасадные панели.png";
// import windowSills from "@/assets/categories/подоконник.png";
// import roof from "@/assets/categories/кровля.png";
// import batteryScreens from "@/assets/categories/радиатор.png";
// import insulation from "@/assets/categories/утеплители.png";
// import ceilings from "@/assets/categories/потолки.png";
// import foamSealant from "@/assets/categories/пена герметик.png";
// import waterDisposal from "@/assets/categories/водоотведение.png";
// import other from "@/assets/categories/прочее.png";

// const categories: Record<
//   string,
//   {
//     text: string;
//     image: string;
//     path: string;
//   }
// > = {
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
    .text
      font-size: 18px
      font-weight: bold
    .hidden
      top: 23px
      right: 5px
      opacity: 0
      position: absolute
      visibility: hidden
      transition: all 0.1s ease

    &:hover
      .hidden
        opacity: 100%
        visibility: visible

.fileInput
  ::v-deep
    .v-input__control
      display: none
    .v-input__details
      display: none
    .v-input__prepend
      margin: 0
</style>
