<template>
  <div class="folders-box" @click.stop="onClick">
    <span class="folder"
    >{{ name }}</span>
      <div class="list-item" v-for="(item, index) in nested" :key="index">
          <recursive-folder :name="item.name" :nested="item.nested" @addFolders="onAddFolder"/>
      </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "recursive-folder"
}
</script>
<script setup lang="ts">
import { IFolder } from "../../types/galleryFolder";

const emit = defineEmits(['addFolders'])

interface Props {
  name: string,
  nested: IFolder[] | null,
  path: string,
}
const props = defineProps<Props>()

const onClick = () => {
  emit('addFolders', props.name)
}

const onAddFolder = (path: string) => {
  emit('addFolders', props.name + '/' + path)
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
