import { createApp } from "vue";
import App from "./App.vue";
import HelloWorld from "./components/HelloWorld.vue";
import Subreddit from "./components/Subreddit.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: HelloWorld },
  { path: "/r/:subreddit", component: Subreddit },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
