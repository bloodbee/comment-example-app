import { createRouter, createWebHistory } from 'vue-router';
import store from '../store'

// Commentary module views
import CommentaryLayout from '@/Commentary/layouts/Commentary.vue';
import HomeView from '@/Commentary/views/Home.vue';
import ChannelView from '@/Commentary/views/Channel.vue';

// Admin module views
import DashboardLayout from '@/Admin/layout/Dashboard.vue';
import UsersView from '@/Admin/views/Users.vue';
import ChannelsView from '@/Admin/views/Channels.vue';
import ChannelDetailView from '@/Admin/views/Channel.vue';

const routes = [
  // Commentary Module
  {
    path: '/',
    name: 'Commentary',
    component: CommentaryLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomeView,
      },
      {
        path: '/channel/:id',
        name: 'Channel',
        component: ChannelView,
      },
    ]
  },
  
  // Admin module
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: DashboardLayout,
    meta: { admin: true },
    redirect: to => {
      // the function receives the target route as the argument
      // we return a redirect path/location here to push to users list in admin
      return { name: 'AdminUsers' }
    },
    children: [
      {
        path: 'users',
        name: 'AdminUsers',
        component: UsersView
      },
      {
        path: 'channels',
        name: 'AdminChannels',
        component: ChannelsView
      },
      {
        path: 'channel/:id',
        name: 'AdminChannel',
        component: ChannelDetailView
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Our router middle ware to check for the metas in each route
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.admin)) {

    // this route need user to be admin
    if (!store.state.user || (store.state.user && store.state.user.role === 'user')) {
      next(from)
    } else {
      next()
    }
  } else {
    next() // always call next() !
  }
})

export default router;
