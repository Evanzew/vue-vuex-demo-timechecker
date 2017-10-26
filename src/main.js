// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import store from './store';
import VueResource from 'vue-resource';
import App from './App';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import './css/app.css';
Vue.config.productionTip = false;

Vue.use(VueResource);

/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router,
  store,
  ...App
});
