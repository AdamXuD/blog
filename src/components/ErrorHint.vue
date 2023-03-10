<script setup lang="ts">
import { useSiteStore } from "@/stores/site";
import { watchEffect } from "vue";

const siteStore = useSiteStore();

const props = withDefaults(
  defineProps<{
    status?: string;
    reason?: string;
  }>(),
  {
    status: "404",
    reason: "前面的区域以后再来探索吧。",
  }
);

watchEffect(() => {
  document.title = `404喵 | ${siteStore.site.title}`;
});
</script>

<template>
  <div class="h-full flex flex-col items-center justify-center">
    <h1 class="py-8 text-3xl font-black text-regular">{{ props.status }}</h1>
    <p class="mb-4">{{ props.reason }}</p>
  </div>
</template>

<style scoped></style>
