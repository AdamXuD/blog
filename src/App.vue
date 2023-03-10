<script setup lang="ts">
import { useArticleStore } from "@/stores/article";
import { useSiteStore } from "./stores/site";
import { ref, watchEffect } from "vue";
import SearchBox from "./components/SearchBox.vue";

const articleStore = useArticleStore();
const siteStore = useSiteStore();

fetch(
  `${import.meta.env.VITE_OSS_PUBLIC_ENDPOINT}/${
    import.meta.env.VITE_OSS_BASE_DIR
  }/data.json`
)
  .then((res) => {
    if (res.status === 404) {
      console.log("数据文件不存在。");
      return Promise.reject("Data file doesn't exist.");
    } else {
      return res.json();
    }
  })
  .then((data) => {
    const { articles, site } = data;
    articleStore.initArticleList(articles);
    siteStore.initSiteData(site);
  })
  .catch((err) => {
    console.log("数据文件加载失败:", err);
  });

const site = siteStore.site;

const isPrefersDark = () => {
  const hour = new Date().getHours();
  return (
    hour >= 23 ||
    hour <= 7 ||
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
};
const isDark = ref(isPrefersDark());
watchEffect(() => {
  if (isDark.value) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});

const isSearchBoxShow = ref(false);
</script>

<template>
  <div class="bg-app text-primary dark:bg-dark-app dark:text-dark-primary">
    <div
      class="max-w-3xl min-h-screen mx-auto px-6 py-12 flex flex-col items-stretch"
    >
      <div class="header flex flex-col items-center mb-16 sm:mb-24">
        <div
          class="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-10"
        >
          <img :src="site.avatar" alt="" />
        </div>
        <h1 class="text-3xl mb-8 font-black text-center">
          <a href="/">
            {{ site.title }}
          </a>
        </h1>
        <div
          class="w-64 flex flex-row justify-evenly text-regular dark:text-dark-regular"
        >
          <router-link to="/" class="homepage" href="" title="主页">
            <i class="bi bi-house"></i>
          </router-link>
          <a
            class="toggle-dark cursor-pointer"
            title="夜间/正常模式"
            @click="isDark = !isDark"
          >
            <i class="bi bi-sun" v-if="isDark"></i>
            <i class="bi bi-moon" v-else></i>
          </a>
          <a class="github" :href="site.github" title="Github">
            <i class="bi bi-github"></i>
          </a>
          <a class="email" :href="`mailto:${site.email}`" title="邮箱">
            <i class="bi bi-envelope"></i>
          </a>
          <a class="search cursor-pointer" @click="isSearchBoxShow = true">
            <i class="bi bi-search" title="搜索"></i>
          </a>
        </div>
      </div>
      <div class="main flex-1 mb-16">
        <RouterView />
      </div>
      <div
        class="footer flex flex-col items-center text-sm text-center text-secondary dark:text-dark-secondary"
        v-html="site.footer"
      ></div>
    </div>
  </div>
  <search-box v-model="isSearchBoxShow"></search-box>
</template>

<style scoped></style>
