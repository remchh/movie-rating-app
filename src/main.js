import { createApp } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import Home from "./pages/Home.vue"
import MovieDetailPage from "./pages/MovieDetailPage.vue"
import App from "./App.vue"
import "../style.css"

const router = createRouter ({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/MovieDetailPage', name: 'MovieDetailPage', component: MovieDetailPage }
  ]
})


createApp(App).use(router).mount("#app")
