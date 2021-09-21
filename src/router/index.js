import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Definitions from '@/views/Definitions.vue';
import DefinitionsCreate from '@/views/DefinitionsCreate.vue';

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
  {
    path: '/definitions/create',
    name: 'DefinitionsCreate',
    component: DefinitionsCreate,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
