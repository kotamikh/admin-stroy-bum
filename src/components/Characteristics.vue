<template>
  <h3>Характеристики:
    <v-btn variant="outlined"
           size="small"
           class="ml-4"
           color="#E3DD5F"
           @click="addChar"
    >Добавить
    </v-btn>
  </h3>
  <ul>
    <li class="list" v-for="char in characteristics">
      <p class="left">
        <span class="label"><input type="text" v-model="char[0]" placeholder="Характеристика"/></span>
        <span class="value"><input type="text" v-model="char[1]" placeholder="Значение"/></span>
      </p>
    </li>
  </ul>

</template>

<script setup lang="ts">
import { ref } from "vue";

const char = ref(['', ''])

const characteristics = ref([char])

const addChar = () => {
  characteristics.value.push(char)
}

</script>

<style scoped lang="sass">
h3
  margin-bottom: 20px

ul
  width: 100%
  list-style: none
  position: relative

  .left
    width: 60%
    display: flex
    overflow: hidden
    position: relative
    margin-bottom: 20px
    justify-content: space-between

    .label
      float: left
      outline: none
      font-weight: bold
      position: relative
      display: inline-block
      border: 1px dashed #555555

      &:after
        content: ''
        bottom: 0
        left: 100%
        right: -275px
        position: absolute
        border-bottom: 1px dotted #888

  .value
    float: left
    border: 1px dashed #555555

  input
    outline: none
    padding: 5px
</style>
