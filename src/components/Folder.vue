<template>
  <div class="folders-box">
    <span class="folder"
          @click="addToPath(name)"
    >{{ name }}</span>
      <div class="list-item" @click="addToPath(name)" v-for="(item, index) in nested" :key="index">
          <recursive-folder
            v-bind="{
            name: item.name,
            nested: item.nested
          }"
          />
      </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "recursive-folder",
  props: {
    name: {
      type: String,
      required: true
    },
    nested: {
      type: Array,
      default: () => []
    },
    path: {
      type: String,
      value: ''
    }
  }
}
</script>
<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(['pathFolders'])
const path = ref<string>('')

const addToPath = (pathName: string) => {
  path.value += '/' + pathName
  console.log(path.value)
}

</script>

<style scoped lang="sass">
.folder
  padding: 10px
  width: 100%
  height: 100%
  display: block
  font-weight: bold
  padding-inline-start: 15px

  &:hover
    background-color: #bfdce8

.list-item
  padding-inline-start: 15px
</style>
