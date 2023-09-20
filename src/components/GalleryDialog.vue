<template>
  <v-dialog width="1000" v-model="show">
    <v-row>
      <v-col v-for="i in store.images"
             :key="i"
             class="gallery"
      >
        <v-hover v-slot="{ isHovering, props }">
          <v-img
              cover
              :src="i"
              v-bind="props"
              aspect-ratio="1"
              class="position-relative"
          >
            <v-overlay :model-value="isHovering"
                       contained
                       scrim="rgb(30, 30, 30)"
                       class="justify-center align-center font-weight-bold"
            ><p style="color: white; font-size: 18px"></p>
            </v-overlay>
          </v-img>
        </v-hover>
      </v-col>
    </v-row>
  </v-dialog>
</template>

<script setup lang="ts">
import { useImagesStore } from "@/store/images";
import { computed } from "vue";

const store = useImagesStore()

const props = defineProps(['showDialog'])
const emit = defineEmits(['update:show'])

const show = computed({
  get() {
    return props.showDialog
  },
  set(value) {
    emit('update:show', value)
  }
})

console.log('Mounted')
</script>

<style scoped lang="sass">
.gallery
  display: flex
  background-color: white
  width: 80%
  height: 80%

</style>
