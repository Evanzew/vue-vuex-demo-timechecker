import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import TimeEntries from '@/components/TimeEntries.vue';
import Login from '@/components/Login';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/time-entries',
      component: TimeEntries,
      children: [
        {
          path: 'log-time',
          component: resolve => require(['@/components/LogTime.vue'], resolve)
        }
      ]
    }
  ]
});
