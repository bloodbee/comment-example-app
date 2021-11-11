import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/Home.vue';
import ChannelView from '@/views/Channel.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/channel/:id',
    name: 'Channel',
    component: ChannelView
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
