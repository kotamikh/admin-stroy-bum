<template>
  <v-list-item>
    <span class="folder">{{ name }}</span>
    <v-list class="nested" v-if="nested">
      <div v-for="(item, index) in nested" :key="index">
        <recursive-folder
          v-bind="{
            name: item.name,
            nested: item.nested
          }"
        />
      </div>
    </v-list>
  </v-list-item>
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
  font-weight: bold

.nested > div
  border-bottom: 1px solid grey
</style>
