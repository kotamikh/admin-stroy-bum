<template>
  <h2>{{ text }}</h2>
  <v-row>
    <v-col cols="3">
      <v-hover v-slot="{ isHovering, props }">
        <v-card v-bind="props"
                variant="outlined"
                style="border: 1px solid white"
                @click="router.push('/creation')"
        >
          <default-card/>
            <v-overlay :model-value="isHovering"
                       contained
                       scrim="#5C8AAFFF"
                       class="justify-center align-center font-weight-bold"
            ><div class="overlay-clue">ДОБАВИТЬ ТОВАР</div>
            </v-overlay>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import DefaultCard from "@/components/DefaultCard.vue";
import router from "@/router";
import { useRoute } from "vue-router";

const route = useRoute()
const { text } = route.params
</script>


<style scoped lang="sass">
.overlay-clue
  padding: 0 5px
  font-size: 18px
  color: #5C8AAFFF
  border-radius: 2px
  background-color: white
</style>
