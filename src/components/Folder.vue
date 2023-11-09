<template>
  <div class="folders-box">
    <span class="folder">{{ name }}</span>
      <div class="list-item" v-for="(item, index) in nested" :key="index">
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
