<template>
  <div>
    <el-dialog title="会员修改" :visible.sync="info.isshow">
      {{ form }}
      <el-form :model="form">
        <!-- 手机号 -->
        <el-form-item label="手机号" label-width="120px">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 昵称 -->
        <el-form-item label="昵称" label-width="120px">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
          <p>留空则不修改</p>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="update">修 改</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqmemberedit, reqmemberinfo } from "../../../request/api";
import { successAlert } from "../../../utils/alert";
export default {
  // 接收父元素传过来的信息
  props: ["info"],
  data() {
    return {
      form: {
        nickname: "",
        phone: "",
        password: "",
        status: "",
      },
    };
  },
  methods: {
    ...mapActions({}),
    // 点击取消
    cancel() {
      this.info.isshow = false;
    },

    empty() {
      this.form = {
        nickname: "",
        phone: "",
        password: "",
        status: "",
      };
    },
    // 请求一条数据
    getOne(uid) {
      reqmemberinfo({ uid: uid }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          // 清空密码
          this.form.password = "";
          // 添加uid字段给form
          this.form.uid = uid;
        }
      });
    },

    // 点击修改
    update() {
      reqmemberedit(this.form).then((res) => {
        if (res.data.code == 200) {
          // 提示成功
          successAlert(res.data.msg);
          // 清空
          this.empty()
          // 弹框消失
          this.info.isshow = false
        }
      });
    },
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
@import "../../../less/index.less";
</style>