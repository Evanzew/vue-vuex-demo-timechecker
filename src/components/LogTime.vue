<template>
  <div class="form-horizontal">
    <div class="form-group">
      <div class="col-sm-6">
        <label>日期：</label>
        <input type="date" class="form-control" v-model="date" placeholder="Date" />
      </div>
      <div class="col-sm-6">
        <label>时间</label>
        <input type="number" class="form-control" v-model="totalTime" placeholder="Hours" />
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-12">
        <label>备注</label>
        <input type="text" class="form-control" v-model="comment" placeholder="Comment" />
      </div>
    </div>
    <button class="btn btn-primary" @click="save()">保存</button>
    <router-link to="/time-entries" class="btn btn -danger">取消</router-link>
  </div>
</template>

<script>
import { addTask } from '../service/taskList';
export default {
  name: 'LogTime',
  data() {
    return {
      date: new Date(),
      totalTime: 0,
      comment: ''
    };
  },
  methods: {
    async save() {
      if (this.$store.state.userName != '') {
        const plan = {
          name: this.$store.state.userName,
          id: this.$store.state.list.length,
          avatar: require('../assets/' + this.$store.state.userName + '.jpg'),
          date: new Date(this.date),
          totalTime: parseFloat(this.totalTime),
          comment: this.comment
        };
        await addTask(plan);
        this.$store.dispatch('savePlan', plan);
        this.$store.dispatch('addTotalTime', parseFloat(this.totalTime));
        this.$router.push('/time-entries');
      } else {
        this.$router.push('/login');
      }
    }
  }
};
</script>
