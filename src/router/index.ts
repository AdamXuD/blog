import { createRouter, createWebHistory } from "vue-router";
import PageView from "@/views/PageView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      alias: "/",
      path: "/page/:page",
      name: "page",
      component: PageView,
      props: (router) => {
        const page = Number(router.params.page);
        return {
          page: Number.isNaN(page) ? 1 : page,
        };
      },
    },
    {
      path: "/article/:article_id",
      name: "article",
      component: () => import("@/views/ArticleView.vue"),
      props: (router) => {
        const article_id = Number(router.params.article_id);
        return {
          article_id: Number.isNaN(article_id) ? -1 : article_id,
        };
      },
    },
    {
      path: "/404",
      name: "404",
      component: () => import("@/views/NotFoundView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/404",
    },
  ],
  scrollBehavior() {
    return {
      top: 0,
      behavior: "smooth",
    };
  },
});

export default router;
