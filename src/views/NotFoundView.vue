<script setup lang="ts">
import NotFound from "@/components/ErrorHint.vue";
import { watchEffect } from "vue";
import { useSiteStore } from "@/stores/site";

const siteStore = useSiteStore();

watchEffect(() => {
  document.title = `404喵 | ${siteStore.site.title}`;
});
</script>

<template>
  <not-found></not-found>
</template>

<style scoped></style>
