<template>
  <div class="product-card">
    <div class="main-information">
      <creation-images-and-track :images="product.images"
                                 :isEdit="isEdit"
                                 :folder="route.params.subjectName"
                                 @update:galleryDialog="isGalleryDialogOpened = true"
      />
      <gallery-dialog
          v-model="isGalleryDialogOpened"
          @update:show="isGalleryDialogOpened = false"
          :product-images="product.images"
          :folder="route.params.subjectName"
          @update:images="onUpdateImages"
          :edit="isEdit"
      />
      <div class="product-information">
        <v-text-field
            label="Наименование товара"
            variant="underlined"
            color="var(--grey)"
            v-model="product.name"
            :rules="[requiredField]"
        />
        <div class="brands">
          <v-select
              label="Имя бренда"
              :items="useSubjectsBrandsStore().brandsBySubject"
              v-model="product.brand"
              item-title="name"
              item-value="id"
              variant="underlined"
              color="var(--grey)"
              :rules="[requiredField]"
          >
          </v-select>
          <div style="display: flex; flex-direction: column; gap: 10px">
            <v-btn variant="tonal"
                   size="small"
                   @click="isNewBrandDialogOpened = true"
            >Добавить бренд
            </v-btn>
            <v-btn variant="tonal"
                   size="small"
                   @click="isDeleteBrandDialogOpened = true"
            >Удалить бренд
            </v-btn>
          </div>
          <v-dialog width="500" v-model="isNewBrandDialogOpened">
            <v-card>
              <v-card-text class="d-flex align-center">
                <v-text-field label="Название бренда" v-model="brandName" variant="underlined"></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="Готово" @click="insertBrand"></v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog width="500" v-model="isDeleteBrandDialogOpened">
            <v-card class="pa-5">
              <v-card-title>Выберите бренд для удаления</v-card-title>
              <v-list>
                <template v-for="brand in useSubjectsBrandsStore().allBrands"
                          :key="brand.id"
                >
                  <v-list-item
                      :value="brand.id"
                      v-text="brand.name"
                      style="cursor: pointer"
                      color="grey"
                      @click="setBrandToDelete(brand)"
                  ></v-list-item>
                </template>
              </v-list>
              <v-btn class="ml-auto" variant="tonal" width="fit-content"
                     @click="useSubjectsBrandsStore().deleteBrand(brandIdToDelete)">Удалить {{ brandToDelete }}
              </v-btn>
            </v-card>
          </v-dialog>
        </div>
        <div class="stock">
          <v-select
              label="Наличие товара"
              :items="[
              { title: 'В наличии', value: 1 },
              { title: 'Под заказ', value: 0 },
            ]"
              variant="underlined"
              color="var(--grey)"
              v-model="product.stock"
          />
        </div>
        <div class="price">
          <div class="current-price">
            <v-text-field
                label="Цена"
                variant="underlined"
                color="var(--grey)"
                class="w-33"
                :rules="[requiredField]"
                v-model.number="product.price"
            />
            <p>руб/шт.</p>
          </div>
          <v-checkbox
              label="Есть скидка"
              v-model="discountExist"
              hide-details
          />
          <div class="old-price" v-if="discountExist">
            <v-text-field
                label="Скидка"
                type="number"
                autofocus
                variant="underlined"
                color="var(--grey)"
                class="discount"
                v-model.number="product.discount"
                hide-details
            >
              <p class="percent">%</p>
            </v-text-field>
            <p class="price-count">
              Старая цена:
              {{ Math.ceil((product.price / (100 - product.discount)) * 100) }}
              руб/шт.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="additional-information">
      <div class="characteristics">
        <characteristics v-model="product.characteristics"/>
      </div>
      <div class="description">
        <h3>Описание:</h3>
        <v-text-field
            variant="filled"
            color="var(--yellow)"
            class="input-description"
            v-model="product.description"
        ></v-text-field>
      </div>
    </div>
  </div>
  <v-btn
      color="var(--green)"
      variant="outlined"
      style="position: absolute; bottom: 50px; right: 140px; font-weight: bold"
      prepend-icon="mdi-check"
      @click="createCard"
  >Готово
  </v-btn>
</template>

<script setup lang="ts">
import router from "@/router";
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import { IProductDto } from "../../types/product";
import { IBrand } from "../../types/subjectBrand";
import { useProductsStore } from "@/store/products";
import { useProductsApi } from "../../api/products";
import GalleryDialog from "@/components/GalleryDialog.vue";
import Characteristics from "@/components/Characteristics.vue";
import { useSubjectsBrandsStore } from "@/store/subjects-brands";
import CreationImagesAndTrack from "@/components/CreationImagesAndTrack.vue";

window.onbeforeunload = function () {
  return "Перезагрузить сайт? Изменения могут не сохраниться"
}

const route = useRoute()
const subjectId = computed<number>(() => {
  if (route.params.subjectName) {
    return useSubjectsBrandsStore().findSubjectId(route.params.subjectName.toString())
  } else {
    console.log('Error: Категория неопределена')
    return 0
  }
})

let defaultProduct: IProductDto = useProductsApi().getDefaultProduct(subjectId.value)
const product = ref<IProductDto>(defaultProduct)
let isEdit = ref(false)

if (route.params.id) {
  isEdit.value = true
  let productId = Number(route.params.id)
  let editableProduct = JSON.parse(JSON.stringify(useProductsStore().productsMap.get(productId)))
  if (editableProduct) {
    product.value = Object.assign(product.value, editableProduct)
  }
}

const discountExist = ref(product.value.discount !== 0)

const isGalleryDialogOpened = ref(false)
const onUpdateImages = (data: Array<string>) => {
  product.value.images = JSON.parse(JSON.stringify(data)).data
}

const brandIdToDelete = ref()
const brandName = ref("")
const brandToDelete = ref("")
const isNewBrandDialogOpened = ref(false)
const isDeleteBrandDialogOpened = ref(false)
useSubjectsBrandsStore().loadAllBrands().then(() => useSubjectsBrandsStore().getBrandsBySubject(subjectId.value))

const insertBrand = () => {
  if (brandName.value) {
    useSubjectsBrandsStore().insertBrand(brandName.value)
    isNewBrandDialogOpened.value = false
    brandName.value = ""
  }
}

const setBrandToDelete = (brand: IBrand) => {
  brandToDelete.value = brand.name
  brandIdToDelete.value = brand.id
}

const requiredField = (v: string) => {
  return !!v || 'Заполните поле'
}

const createCard = async () => {
  if (product.value.name && product.value.price && product.value.brand) {
    await useProductsStore().insertProduct(product.value, isEdit.value)
    await router.push({ name: "Category", params: { subjectName: route.params.subjectName } })
  } else {
    alert("Необходимо заполнить обязательные поля")
  }
}
</script>

<style scoped lang="sass">
.product-card
  width: 100%
  margin: 70px auto

  .main-information
    display: flex
    color: var(--middle-grey)
    margin-bottom: 70px
    justify-content: space-between

    .product-information
      width: 40%

      .brands
        gap: 20px
        display: flex
        margin: 20px 0

      .stock
        width: 40%

      .current-price
        width: 30%
        display: flex
        align-items: center

      .old-price
        gap: 20px
        width: 70%
        display: flex
        position: relative
        align-content: flex-end

        .discount
          width: 25%
          max-width: 70px

        .percent
          right: 0
          position: absolute

        .price-count
          align-self: flex-end

  .additional-information
    gap: 30px
    display: flex
    flex-direction: column

    h3
      margin-bottom: 20px

    .characteristics,
    .description
      font-size: calc((100vw - 320px) / (1280 - 320) * (18 - 16) + 16px)

      .input-description
        width: 100%
        height: 200px
</style>
