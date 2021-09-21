import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Definitions from '@/views/Definitions.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/definitions',
    name: 'Definitions',
    component: Definitions,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
