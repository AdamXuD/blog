import { defineStore } from "pinia";
import { reactive } from "vue";

export const useSiteStore = defineStore("site", () => {
  const site: {
    avatar?: string;
    title?: string;
    description?: string;
    github?: string;
    email?: string;
    footer?: string;
  } = reactive({});

  const initSiteData = (data: unknown) => {
    return Object.assign(site, data);
  };

  return { site, initSiteData };
});
