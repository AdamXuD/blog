<script setup lang="ts">
import { useArticleStore } from "@/stores/article";
import { timeFormat } from "@/utils";
import { computed, watchEffect } from "vue";
import { marked } from "marked";
import hljs from "highlight.js";
import { useSiteStore } from "@/stores/site";
import ErrorHint from "@/components/ErrorHint.vue";

marked.setOptions({
  highlight: (code, lang) => {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: "language-",
  gfm: true,
  breaks: true,
});

const props = defineProps<{
  article_id: number;
}>();

const articlesStore = useArticleStore();
const siteStore = useSiteStore();

const articleDetail = computed(() => {
  return articlesStore.getArticleDetailById(props.article_id);
});

watchEffect(() => {
  if (articleDetail.value) {
    document.title = `${articleDetail.value.title} | ${siteStore.site.title}`;
  } else {
    document.title = `空 | ${siteStore.site.title}`;
  }
});
</script>

<template>
  <div v-if="articleDetail">
    <div class="article-container flex flex-col items-scretch mb-10">
      <div class="title-area flex flex-col items-center mb-6">
        <h1 class="title text-2xl mb-4 font-black text-center">
          {{ articleDetail.title }}
        </h1>
        <p class="time text-sm text-regular dark:text-dark-regular">
          {{ timeFormat(articleDetail.created_time) }} / AdamXuD
        </p>
      </div>
      <div
        class="content prose prose-lg max-w-none prose-img:m-auto prose-img:rounded prose-pre:scroll dark:prose-invert"
        v-html="marked.parse(articleDetail.content)"
      ></div>
    </div>
    <div class="next-or-prev flex flex-row justify-evenly">
      <div class="flex flex-col items-center w-1/2" v-if="articleDetail?.prev">
        <div class="py-6">上一篇</div>
        <router-link
          :to="`/article/${articleDetail.prev.article_id}`"
          class="text-2xl font-bold text-center flex-1"
        >
          <h2>
            {{ articleDetail.prev.title }}
          </h2>
        </router-link>
      </div>
      <div class="flex flex-col items-center w-1/2" v-if="articleDetail?.next">
        <div class="py-6">下一篇</div>
        <router-link
          :to="`/article/${articleDetail.next.article_id}`"
          class="text-2xl font-bold text-center"
        >
          <h2>
            {{ articleDetail.next.title }}
          </h2>
        </router-link>
      </div>
    </div>
  </div>
  <div v-else>
    <error-hint status="404" reason="文章不存在。"></error-hint>
  </div>
</template>

<style scoped></style>
