<template>
  <div id="wrapper">
    <nav class="navbar navbar-default" >
      <div class="container">
        <a class="navbar-brand" href="#">
           <i class="glyphicon glyphicon-time"></i>
           计划板 
        </a>
        <ul class="nav navbar-nav">
          <li>
            <router-link to="/home">首页</router-link>
          </li>
          <li>
            <router-link to="/time-entries">计划列表</router-link>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li v-if="!userName">
            <router-link  to="/login">登录</router-link>
          </li>
          <li class="dropdown" v-else>
              <!-- <a data-toggle="dropdown"  class="dropdown-toggle"><b>{{userName}}</b><span class="caret"></span></a> -->
              <a data-toggle="dropdown" class="dropdown-toggle nav-avatar">
                <img :src="userImg"  class="avatarImg" width="35" height="35">
              </a>
              <ul class="dropdown-menu-custom dropdown-menu">
                 <li>
                   <h5 class="item-disabled">
                      <span class="glyphicon glyphicon-user"></span> {{userName}}
                   </h5>
                  </li>
                  <li>
                      <a @click="logout()">Logout</a>
                  </li>
              </ul>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container">
        <router-view></router-view>
    </div>
    
    <footer>
      <hr class="feet-hr">
      <ul class="info-list">
        <li class="text-center">
          <span class="strline">TimeChecker1.0 &nbsp;&nbsp;</span>
          <a class="feet-link" href="mailto:Evan.Zou@perficient.com?subject=Issue on training  TimeChecker1.0 ">&nbsp;&nbsp;Report a problem&nbsp;&nbsp;</a>
        </li>
        <li class="text-center">
          <span>Design By PERFICIENT/EVAN © 2017 Perficient, Inc.</span>
        </li>
      </ul>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: sessionStorage.getItem('userName')
    };
  },
  computed: {
    userImg() {
      if (this.$store.state.userName !== '') {
        return require('./assets/' + this.$store.state.userName + '.jpg');
      } else {
        return require('./assets/Person.jpg');
      }
    }
  },
  created() {
    var userName = sessionStorage.getItem('userName');
    if (userName != undefined) {
      this.$store.dispatch('recordUserInfo', userName);
    }
  },
  methods: {
    logout() {
      location.reload();
      this.$router.push('/login');
      this.$store.dispatch('recordUserInfo', '');
      sessionStorage.clear('userName');
    }
  },
  initData() {
    this.$store.state.userName = sessionStorage.getItem('userName');
  }
};
</script>




