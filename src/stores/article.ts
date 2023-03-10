import { defineStore } from "pinia";
import { reactive } from "vue";

interface Article {
  article_id: number;
  title: string;
  content: string;
  created_time: number;
  updated_time: number;
  fingerprint: string;
}

export const useArticleStore = defineStore("article", () => {
  const _articleList: Article[] = reactive([]);

  const initArticleList = (data: Article[]) => {
    _articleList.length = 0;
    _articleList.push(...data);
  };

  const getArticleDetailById = (id: number) => {
    const index = _articleList.findIndex((item) => item.article_id === id);
    if (index === -1) return null;
    return {
      ..._articleList[index],
      next: _articleList[index + 1] || null,
      prev: _articleList[index - 1] || null,
    };
  };

  const pagination = (option: { page: number; page_size: number }) => {
    const { page, page_size } = option;
    const pageStart = (page - 1) * page_size;
    const pageEnd = pageStart + page_size;
    return {
      result: _articleList.slice(pageStart, pageEnd),
      total_page: Math.ceil(_articleList.length / page_size),
    };
  };

  const search = (keyword: string) => {
    if (keyword.length === 0) return [];

    const result: Array<Article & { index: number }> = [];
    _articleList.forEach((item) => {
      if (item.title.includes(keyword)) {
        result.push({ ...item, index: -1 });
        return;
      }
      const index = item.content.indexOf(keyword);
      if (index !== -1) result.push({ ...item, index });
    });

    return result;
  };

  return { initArticleList, getArticleDetailById, pagination, search };
});
