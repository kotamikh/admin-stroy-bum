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
    <li class="list-item" v-for="char in characteristics">
        <span class="label"><v-text-field label="Характеристика"
                                          variant="underlined"
                                          color="#E3DD5F"
                                          hide-details
                                          v-model="char[0]"/></span>
        <span class="value"><v-text-field label="Значение"
                                          variant="underlined"
                                          color="#E3DD5F"
                                          hide-details
                                          v-model="char[1]"/></span>
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

  .list-item
    width: 50%
    display: flex
    overflow: hidden
    position: relative
    margin-bottom: 20px
    justify-content: space-between

    .label
      width: 30%
      float: left
      display: flex
      position: relative
      align-items: flex-end

      &:after
        content: ''
        bottom: 0
        left: 100%
        right: -230px
        position: absolute
        border-bottom: 1px dotted #888

    .value
      width: 30%
      float: left
      display: flex
      align-items: flex-end

  input
    outline: none
    padding: 5px
</style>
