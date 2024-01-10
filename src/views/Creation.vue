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
          :edit="isEdit"
          :product-images="product.images"
          :folderName="imageDialogFolderName"
          @update:images="onUpdateImages"
          @update:show="isGalleryDialogOpened = false"
      />
      <div class="product-information">
        <v-text-field
            label="Наименование товара"
            variant="underlined"
            color="#555555"
            v-model="product.name"
            :rules="[requiredField]"
        />
        <v-select label="Категория товара"
                  item-title="name"
                  item-value="id"
                  variant="underlined"
                  color="#555555"
                  :rules="[requiredField]"
                  :items="subjectsToSelect"
                  v-model="product.subject"

        ></v-select>
        <select-and-dialogs name="бренд"
                            :value="chosenBrandName"
                            @change="product.brand = $event"
                            :items="useSubjectsBrandsStore().allBrands"
                            :deleteFunction="useSubjectsBrandsStore().deleteBrand"
                            :insertFunction="useSubjectsBrandsStore().insertBrand"
                            @update-items="useSubjectsBrandsStore().loadAllBrands"
        ></select-and-dialogs>
        <select-and-dialogs name="валюта"
                            :value="chosenCurrencyName"
                            @change="product.currency = $event"
                            :items="useCurrencyStore().allCurrencies"
                            :deleteFunction="useCurrencyStore().deleteCurrency"
                            :insertFunction="useCurrencyStore().insertCurrency"
                            @update-items="useCurrencyStore().loadAllCurrencies"
        ></select-and-dialogs>
        <div class="stock">
          <v-select
              label="Наличие товара"
              :items="[
              { title: 'В наличии', value: 1 },
              { title: 'Под заказ', value: 0 },
            ]"
              variant="underlined"
              color="#555555"
              v-model="product.stock"
          />
        </div>
        <div class="price">
          <div class="current-price">
            <v-text-field
                label="Цена"
                variant="underlined"
                color="#555555"
                class="w-33"
                :rules="[requiredField]"
                v-model.number="product.price"
            />
            <p>{{ chosenCurrencyName }}</p>
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
                color="#555555"
                class="discount"
                v-model.number="product.discount"
                hide-details
            >
              <p class="percent">%</p>
            </v-text-field>
            <p class="price-count">
              Старая цена:
              {{ Math.ceil((product.price / (100 - product.discount)) * 100) }}
              {{ chosenCurrencyName }}
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
            color="#FFDF3C"
            class="input-description"
            v-model="product.description"
        ></v-text-field>
      </div>
    </div>
  </div>
  <v-btn
      color="#49AE66"
      variant="outlined"
      style="position: absolute; bottom: 50px; right: 140px; font-weight: bold"
      prepend-icon="mdi-check"
      @click="createCard"
  >Готово
  </v-btn>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import { IProductDto } from "@/types/product";
import { useProductsApi } from "@/api/products";
import { useProductsStore } from "@/store/products";
import { useCurrencyStore } from "@/store/currency";
import GalleryDialog from "@/components/GalleryDialog.vue";
import Characteristics from "@/components/Characteristics.vue";
import { useSubjectsBrandsStore } from "@/store/subjects-brands";
import SelectAndDialogs from "@/components/SelectAndDialogs.vue";
import CreationImagesAndTrack from "@/components/CreationImagesAndTrack.vue";
import router from "@/router";

const brandStore = useSubjectsBrandsStore()
const currencyStore = useCurrencyStore()

const chosenBrandName = computed<string>(() => {
  const brand = brandStore.allBrands.find(b => b.id == product.value.brand)
  if (brand) {
    return brand.name
  }
  return ""
})

const chosenCurrencyName = computed<string>(() => {
  const currency = currencyStore.allCurrencies.find(c => c.id == product.value.currency)
  if (currency) {
    return currency.name
  }
  return ""
})

const route = useRoute()
const subjectId = computed<number>(() => {
  if (route.params.subjectName) {
    return useSubjectsBrandsStore().findSubjectId(route.params.subjectName.toString())
  } else {
    new Error('Категория не определена')
    return 0
  }
})

const parentalSubject = useSubjectsBrandsStore().parentalSubjects.find(s => s.id === subjectId.value)
useSubjectsBrandsStore().findSubjectsByParent(subjectId.value)

const subjectsToSelect = computed(() => {
  if (subjectId.value !== 0 && parentalSubject) {
    const subjects = [...useSubjectsBrandsStore().childrenSubjects]

    if (parentalSubject) {
      subjects.unshift(parentalSubject)
    }
    return subjects

  } else if (subjectId.value === 0 && parentalSubject) {
    return parentalSubject
  }

  return []
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
const imageDialogFolderName = 'Товары,' + route.params.subjectName

const onUpdateImages = (data: Array<string>) => {
  product.value.images = JSON.parse(JSON.stringify(data)).data
}

useSubjectsBrandsStore().loadAllBrands()
useCurrencyStore().loadAllCurrencies()

const requiredField = (v: string) => {
  return !!v || 'Заполните поле'
}

const createCard = async () => {
  console.log(product.value)
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
