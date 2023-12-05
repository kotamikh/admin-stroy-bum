<template>
  <v-app>
    <main-layout>
      <router-view></router-view>
    </main-layout>
  </v-app>
</template>

<script lang="ts" setup>
import MainLayout from "@/layouts/MainLayout.vue";
import { useSubjectsBrandsStore } from "@/store/subjects-brands";

useSubjectsBrandsStore().loadAllSubjects()
</script>
