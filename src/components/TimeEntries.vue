<template>
    <div>
        <div class="col-sm-3">
            <sidebar></sidebar>
        </div>
        <div class="col-sm-9">
            <router-link v-if="isNoUser" to="/login" class="btn btn-primary">
                创建
            </router-link>
            <router-link v-else-if="!isNoUser && $route.path !== '/time-entries/log-time'" to="/time-entries/log-time" class="btn btn-primary">
                创建
            </router-link>
            <div v-else-if="$route.path === '/time-entries/log-time'">
                <h3>创建</h3>
            </div>
            <router-view></router-view>
            <hr>
            <div class="time-entries">
                <p v-if="!plans.length">
                    <strong>还没有任何计划</strong>
                </p>

                <div class="list-group">
                    <a class="list-group-item" v-for="(plan,index) in plans" :key="index">
                        <div class="row">
                            <div class="col-sm-2 user-details">
                                <img :src="plan.avatar" class="avatar img-circle img-responsive" alt="">
                                <p class="text-center">
                                    <strong>{{plan.name}}</strong>
                                </p>
                            </div>
                            <div class="col-sm-2 text-center time-block">
                                <h3 class="list-group-item-text total-time">
                                    <i class="glyphicon glyphicon-time"></i>
                                    {{plan.totalTime}}
                                </h3>
                                <p class="label label-primary text-center">
                                    <i class="glyphicon glyphicon-calendar"></i>
                                    {{plan.date| formatDate}}
                                </p>
                            </div>
                            <div class="col-sm-7 comment-section">
                                <p>{{plan.comment}}</p>
                            </div>

                            <div class="col-sm-1">
                                <button class="btn btn-xs btn-danger delete-button" @click="deletePlan(index,plan.id)">
                                    X
                                </button>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from './Sidebar.vue';
import { formatDate } from '../config/date';
import { getAllTasks, delTask } from '../service/taskList';

export default {
  components: {
    sidebar: Sidebar
  },
  name: 'TimeEntries',

  computed: {
    isNoUser() {
      if (this.$store.state.userName == '') {
        return true;
      } else {
        return false;
      }
    },
    plans() {
      return this.$store.state.list;
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd');
    }
  },
  mounted: function() {
    this.$nextTick(async function() {
      this.$store.state.list.splice(0, this.$store.state.list.length);
      this.$store.state.totalTime = 0;
      if (this.$store.state.userName != '') {
        var data = { User_Name: this.$store.state.userName };
        var plans = await getAllTasks(data);
        plans.data.forEach((syncPlan, index) => {
          const plan = {
            name: this.$store.state.userName,
            avatar: require('../assets/' + this.$store.state.userName + '.jpg'),
            id: syncPlan.Id,
            date: syncPlan.Date,
            totalTime: parseFloat(syncPlan.Time),
            comment: syncPlan.Comments
          };
          this.$store.dispatch('addTotalTime', parseFloat(syncPlan.Time));
          this.$store.dispatch('savePlan', plan);
        });
      }
    });
  },
  methods: {
    async deletePlan(index, id) {
      var data = {
        User_Name: this.$store.state.userName,
        Id: id
      };
      await delTask(data);
      this.$store.dispatch('decTotalTime', this.plans[index].totalTime);
      this.$store.dispatch('deletePlan', index);
    }
  }
};
</script>

<style>
.avatar {
  height: 75px;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
}

.user-details {
  background-color: #f5f5f5;
  border-right: 1px solid #ddd;
  margin: -10px 0;
}

.time-block {
  padding: 10px;
}

.comment-section {
  padding: 20px;
}
</style>
