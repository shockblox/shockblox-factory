import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import DappDirectory from '@/views/DappDirectory.vue';
import DappCreate from '@/views/DappCreate.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/dapps',
    name: 'DappDirectory',
    component: DappDirectory,
  },
  {
    path: '/dapps/create',
    name: 'DappCreate',
    component: DappCreate,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
