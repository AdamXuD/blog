import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/style/index.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "highlight.js/styles/github-dark-dimmed.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
