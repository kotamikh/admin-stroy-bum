<template>
  <h2>Выбор категории</h2>
  <v-list class="categories">
    <v-list-item v-for="(category, id) in categories"
        :key="id"
        width="300px"
        height="80px"
        class="d-flex text-wrap"
        :to="{path: 'category'}"
    >
      <template v-slot:prepend>
        <img :src="category.image" alt="img" style="width: 3rem; margin-right: 10px"/>
      </template>
      <h3>{{ category.text }}</h3>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import siding from '@/assets/categories/сайдинг.png'
import additionalElements from '@/assets/categories/доборные элементы.png'
import decking from '@/assets/categories/террасная доска.png'
import facadePanels from '@/assets/categories/фасадные панели.png'
import windowSills from '@/assets/categories/подоконник.png'
import roof from '@/assets/categories/кровля.png'
import batteryScreens from '@/assets/categories/радиатор.png'
import insulation from '@/assets/categories/утеплители.png'
import ceilings from '@/assets/categories/потолки.png'
import foamSealant from '@/assets/categories/пена герметик.png'
import waterDisposal from '@/assets/categories/водоотведение.png'
import other from '@/assets/categories/прочее.png'

const categories = {
  siding: {
    text: 'Сайдинг',
    image: siding,
    path: 'siding'
  },
  additionalElements: {
    text: 'Доборные элементы сайдинга',
    image: additionalElements,
    path: 'additionalElements'
  },
  decking: {
    text: 'Террасная доска',
    image: decking,
    path: 'decking'
  },
  facadePanels: {
    text: 'Фасадные панели',
    image: facadePanels,
    path: 'facadePanels'
  },
  windowSills: {
    text: 'Подоконники',
    image: windowSills,
    path: 'windowSills'
  },
  roof: {
    text: 'Кровля',
    image: roof,
    path: 'roof'
  },
  batteryScreens: {
    text: 'Декоративные экраны для батарей',
    image: batteryScreens,
    path: 'batteryScreens'
  },
  insulation: {
    text: 'Утеплители',
    image: insulation,
    path: 'insulation'
  },
  ceilings: {
    text: 'Подвесные потолки',
    image: ceilings,
    path: 'ceilings'
  },
  foamSealant: {
    text: 'Пена герметики, пистолеты',
    image: foamSealant,
    path: 'foamSealant'
  },
  waterDisposal: {
    text: 'Водосточные системы',
    image: waterDisposal,
    path: 'waterDisposal'
  },
  other: {
    text: 'Прочее',
    image: other,
    path: 'other'
  }
}

</script>

<style scoped lang="sass">
.categories
  gap: 20px
  display: flex
  flex-wrap: wrap
  height: 450px
  flex-direction: column
  align-content: space-evenly
</style>
