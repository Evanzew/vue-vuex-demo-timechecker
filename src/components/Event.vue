<template>
    <div class="row" v-bind:key="index">
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
            <button class="btn btn-xs btn-danger delete-button" v-on:click="deletePlan(index,plan)">
                X
            </button>
        </div>
    </div>
</template>

<script>
import { formatDate } from '../config/date';
import { delTask } from '../service/taskList';
export default {
  props: { plan: { type: Object }, index: Number },
  methods: {
    async deletePlan(index, plan) {
      var data = {
        User_Name: this.$store.state.userName,
        Id: plan.id
      };
      await delTask(data);
      this.$store.dispatch('decTotalTime', plan.totalTime);
      this.$store.dispatch('deletePlan', index);
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd');
    }
  }
};
</script>
