<template>
    <div>
        <div class="col-xs-12 col-md-12 col-sm-12 text-center xs-margin">
            <img src="../assets/perficient-logo.png">
        </div>
        <div class="container" style="text-align: center; height: 100%">
            <table border="0" style="width: 100%; display: inline;">
                <tbody>
                    <tr>
                        <td class="hidden-xs col-md-6 col-sm-6">
                            <img src="../assets/perficient-left.png" style="width: 100%"></td>
                        <td class="col-md-6 col-xs-12 col-sm-6">
                            <div id="login" style="border-radius: 6px; border: 1px solid #cccccc; text-align: center;" class="login-margin">
                                <div class="login-header;" style="margin: 28px 0 10px 0">
                                    <h3 style="font-weight: 500; font-size: 24px; margin-bottom: 3%;">Log In</h3>
                                </div>

                                <form method="post" id="fm1">
                                    <section class="row">
                                        <div>
                                            <input class="cas-login-input" id="username" size="25" tabindex="1" type="text" autocomplete="off" placeholder="Input User Name" name="userName" v-model="userName">
                                            <input
                                                tabindex="1" 
                                                class="cas-login-input"
                                                id="password"
                                                size="25"
                                                type="password"
                                                placeholder="Password"
                                                name="passwprd"
                                                v-model="password"
                                            />
                                        </div>
                                    </section>

                                    <section class="row check">
                                    </section>

                                    <section class="row btn-row">
                                        <input class="btn btn-submit login-login" name="submit" accesskey="l" value="Login" tabindex="6" type="button"  @click="userLogin()">
                                        <input class="btn btn-submit login-reset" name="reset" accesskey="c" value="Reset" tabindex="7" type="Reset" @click="userReset()">
                                    </section>
                                </form>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import { accountLogin } from '../service/userLogin';
export default {
  name: 'Login',
  data() {
    return {
      userName: '',
      password: ''
    };
  },
  methods: {
    async userLogin() {
      try {
        var data = { User_Name: this.userName, Password: this.password };
        var result = await accountLogin(data);
        if (result.code != 200 || result.message == 'Not Found') {
          alert(result.message);
        } else {
          location.reload();
          this.$router.push({ path: '/time-entries' });
          sessionStorage.setItem('userName', this.userName);
          this.$store.dispatch('recordUserInfo', this.userName);
        }
      } catch (error) {
        console.log(error);
      }
    },
    userReset() {
      this.userName = '';
      this.password = '';
    }
  }
};
</script>
<style>
.login-container {
  text-align: center;
}

.login-form-div {
  border-radius: 6px;
  border: 1px solid #cccccc;
  text-align: center;
}

.login-header {
  margin: 28px 0 10px 0;
}

.login-h3 {
  font-weight: 500;
  font-size: 24px;
  margin-bottom: 3%;
}

.login-img {
  width: 100%;
}

.cas-login-input {
  height: 34px;
  background-color: white;
  font-size: 15px;
  border-radius: 3px;
  border: 1px solid rgb(204, 204, 204);
  padding: 6px 12px 6px 12px;
  margin: 0 30px 30px 30px;
  width: 74%;
}

.login-login {
  border-color: rgb(53, 126, 189);
  color: rgb(255, 255, 255);
  background-color: rgb(66, 139, 202);
  margin: 0px 60px 30px 0;
  font-size: 16px;
  border-radius: 6px;
  padding: 4px 14px;
  border: 1px solid transparent;
}

.login-reset {
  border-color: rgb(53, 126, 189);
  color: rgb(255, 255, 255);
  background-color: rgb(66, 139, 202);
  font-size: 16px;
  border-radius: 6px;
  padding: 4px 14px;
  border: 1px solid transparent;
  margin-bottom: 30px;
}

.xs-margin {
  margin-top: 1.6%;
}

@media (max-width: 767px) {
  .xs-margin {
    margin-bottom: 15% !important;
    margin-top: 15% !important;
  }
}
</style>
