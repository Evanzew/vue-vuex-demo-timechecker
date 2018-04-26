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
                       <event 
                       v-bind:plan="plan" 
                       v-bind:index="index"
                        v-on:deletePlan="deletePlan">
                        </event>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from './Sidebar.vue';
import Event from './Event.vue';
import { getAllTasks, delTask } from '../service/taskList';

export default {
  components: {
    sidebar: Sidebar,
    event: Event
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
