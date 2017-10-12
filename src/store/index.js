import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const state = {
  totalTime: parseInt(6),
  list: [
    {
      name: 'colin',
      avatar: require('../assets/Colin.jpg'),
      date: '2017-10-12',
      totalTime: parseInt(6),
      comment: '10月12日晚上，看qqq直播6小时'
    }
  ]
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
