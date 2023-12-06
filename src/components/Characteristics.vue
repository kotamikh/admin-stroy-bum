<template>
  <div class="characteristics">
    <h3>Характеристики:
      <v-btn variant="outlined"
             size="small"
             class="ml-4"
             color="var(--yellow)"
             @click="addCharacteristic"
      >Добавить
      </v-btn>
    </h3>
    <ul>
      <li class="list-item" v-for="char in data">
      <span class="label"><v-text-field label="Характеристика"
                                        variant="underlined"
                                        color="var(--grey)"
                                        hide-details
                                        autofocus
                                        v-model="char[0]"/></span>
        <span class="value"><v-text-field label="Значение"
                                          variant="underlined"
                                          color="var(--grey)"
                                          hide-details
                                          v-model="char[1]"/></span>
          <v-icon class="delete-icon" icon="mdi-close-circle-outline" @click="deleteCharacteristic(char)"></v-icon>
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

const createCharacteristic = () => {
  return (['', ''])
}

const addCharacteristic = () => {
  if (!data.value.length || !data.value[data.value.length - 1].includes('')) {
      let newChar = createCharacteristic()
      data.value.push(newChar)
  }
}

const deleteCharacteristic = (char: string[]) => {
  data.value = data.value.filter(el => el !== char)
}
</script>

<style scoped lang="sass">
.characteristics
  width: 60%

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
        width: 40%
        float: left
        display: flex
        position: relative
        align-items: flex-end

        &:after
          content: ''
          bottom: 0
          left: 100%
          right: -135px
          position: absolute
          border-bottom: 1px dashed #a9a9a9

      .value
        width: 40%
        float: left
        display: flex
        align-items: flex-end

      .delete-icon
        right: 0
        top: 10px
        cursor: pointer
        position: absolute
</style>
