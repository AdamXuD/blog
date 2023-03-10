<script setup lang="ts">
import { useArticleStore } from "@/stores/article";
import { useSiteStore } from "@/stores/site";
import { timeFormat } from "@/utils";
import { computed, watchEffect } from "vue";
import ErrorHint from "@/components/ErrorHint.vue";

const props = defineProps<{
  page: number;
}>();

const articlesStore = useArticleStore();
const siteStore = useSiteStore();

const filterResult = computed(() => {
  return articlesStore.pagination({
    page: props.page,
    page_size: 10,
  });
});

watchEffect(() => {
  document.title = siteStore.site.title || "";
});
</script>

<template>
  <div v-if="filterResult.result.length">
    <div class="list-container flex flex-col items-center">
      <article
        v-for="item in filterResult.result"
        :key="item.article_id"
        class="mb-12"
      >
        <router-link
          :to="`/article/${item.article_id}`"
          class="flex flex-col items-center"
        >
          <h2 class="title mb-3 text-2xl font-black text-center">
            {{ item.title }}
          </h2>
          <p class="time text-sm text-regular dark:text-dark-regular">
            {{ timeFormat(item.created_time) }}
          </p>
        </router-link>
      </article>
    </div>
    <div class="pagination flex flex-row items-center justify-evenly font-bold">
      <div v-if="page > 1">
        <router-link :to="`/page/${page - 1}`"> 上一页 </router-link>
      </div>
      <div v-if="page < filterResult.total_page">
        <router-link :to="`/page/${page + 1}`"> 下一页 </router-link>
      </div>
    </div>
  </div>
  <div v-else>
    <error-hint status="204" reason="文章列表为空。"></error-hint>
  </div>
</template>

<style scoped></style>
