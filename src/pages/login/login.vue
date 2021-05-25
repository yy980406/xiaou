<template>
  <div class="login">
    <div class="con">
      <h3 class="center">登录</h3>

      <p class="input">
        <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
      </p>

      <p class="input">
        <el-input
          type="password"
          v-model="user.password"
          placeholder="请输入密码"
        ></el-input>
      </p>

      <p class="center">
        <el-button type="primary" class="loginBtn" @click="login"
          >登录</el-button
        >
      </p>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { requserlogin } from "../../request/api";
import { errorAlert, successAlert } from "../../utils/alert";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {},
  methods: {
    ...mapActions({
        changeName:"changeUserInfo"
    }),
    login() {
      //  判断用户输入的是空就不发请求
      if (this.user.username == "" || this.user.password == "") {
        errorAlert("请输入用户名或密码！");
        return;
      }

      requserlogin(this.user).then((res) => {
        if (res.data.code == 200) {
          // 提示用户登录成功
          successAlert(res.data.msg);
          // 将用户信息存入vuex中
            this.changeName(res.data.list)
          // 跳转页面
          this.$router.push("/");
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../less/index.less";
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(@primary, @primary2);
  position: relative;
}

.con {
  width: 300px;
  padding: 30px;
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.center {
  text-align: center;
}

h3.center {
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: bold;
}

.input {
  margin-bottom: 20px;
}

.loginBtn {
  width: 100%;
}
</style>