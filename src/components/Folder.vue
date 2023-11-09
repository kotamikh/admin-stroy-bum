<template>
  <div class="folders-box" @click.stop="onClick">
    <span class="folder"
    >{{ name }}</span>
      <div class="list-item" v-for="(item, index) in nested" :key="index">
          <recursive-folder :name="item.name" :nested="item.nested" @custom="onCustom"/>
      </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "recursive-folder"
}
</script>
<script setup lang="ts">
const emit = defineEmits(['custom'])

interface Props {
  name: string,
  nested: any[],
  path: string,
}
const props = defineProps<Props>()

const onClick = () => {
  emit('custom', props.name)
}

const onCustom = (path: string) => {
  emit('custom', props.name + '/' + path)
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
