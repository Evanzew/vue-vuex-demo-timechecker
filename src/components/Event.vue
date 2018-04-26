<template>
    <div class="row" :key="index">
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
</template>

<script>
import { formatDate } from '../config/date';
export default {
  props: { plan: { type: Object }, deletePlan: Function, index: Number },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd');
    }
  }
};
</script>
