<template>
    <h2>Выбор категории</h2>
    <v-list class="categories">
      <v-btn
        @click="categoryDialog = true"
        prepend-icon="mdi-plus"
        variant="tonal"
        width="fit-content"
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
            variant="tonal"
            class="hidden"
            @click.stop="useCategoriesBrandsStore().deleteCategory(category.id)"
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
</style>
