import * as types from './mutation-types';

export default {
  addTotalTime({ commit }, time) {
    commit(types.ADD_TOTAL_TIME, time);
  },
  decTotalTime({ commit }, time) {
    commit(types.DEC_TOTAL_TIME, time);
  },
  savePlan({ commit }, plan) {
    commit(types.SAVE_PLAN, plan);
  },
  deletePlan({ commit }, index) {
    commit(types.DELETE_PLAN, index);
  },
  recordUserInfo({ commit }, userName) {
    commit(types.RECORD_USERINFO, userName);
  }
};
