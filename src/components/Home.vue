<template>
<div>
    <div class="col-sm-3">
        <sidebar></sidebar>
    </div>
    <div class="col-sm-9">
       <div class="jumbotron">
        <h1>计划管理</h1>
        <p>
            <strong>
              <router-link to="/login" v-if="isNoUser">创建一个计划</router-link>
                <router-link to="/time-entries/log-time" v-else>创建一个计划</router-link>
            </strong>
        </p>
       </div>
    </div>
</div>
</template>
<script>
import Sidebar from './Sidebar.vue';
export default {
  components: {
    sidebar: Sidebar
  },
  computed: {
    isNoUser() {
      if (this.$store.state.userName == '') {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>