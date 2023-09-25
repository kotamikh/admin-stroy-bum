<template>
  <div class="characteristics">
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
      <li class="list-item" v-for="char in data">
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
  </div>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  modelValue: Array<Array<string>>
}>()

const emit = defineEmits(['update:modelValue'])

const data = useVModel(props, 'modelValue', emit, { deep: true })

const createChar = () => {
  return (['', ''])
}

const addChar = () => {
  let newChar = createChar()
  data.value.push(newChar)
  console.log(data.value)
}

</script>

<style scoped lang="sass">
.characteristics
  width: 55%

  h3
    margin-bottom: 20px

  ul
    width: 100%
    list-style: none
    position: relative

    .list-item
      width: 100%
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
          right: -250px
          position: absolute
          border-bottom: 1px dotted #888

      .value
        width: 30%
        float: left
        display: flex
        align-items: flex-end
</style>
