<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '菜单添加' : '菜单编辑'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <el-form :model="form">
        <!-- 菜单名称 -->
        <el-form-item label="菜单名称" label-width="120px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 上级菜单 -->
        <el-form-item label="上级菜单" label-width="120px">
          <el-select
            v-model="form.pid"
            placeholder="请选择上级菜单"
            @change="changePid"
          >
            <el-option label="请选择" value="" disabled></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 遍历list -->
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 单选 -->
        <el-form-item label="菜单类型" label-width="120px">
          <el-radio v-model="form.type" disabled :label="1">目录</el-radio>
          <el-radio v-model="form.type" disabled :label="2">菜单</el-radio>
        </el-form-item>

        <!-- 菜单图标 -->
        <el-form-item
          label="菜单图标"
          label-width="120px"
          v-if="form.type == 1"
        >
          <el-select v-model="form.icon" placeholder="请选择菜单图标">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option :value="item" v-for="item in icons" :key="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 菜单地址 -->
        <el-form-item label="菜单地址" label-width="120px" v-else>
          <el-select v-model="form.url" placeholder="请选择菜单地址">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              :value="'/' + item.path"
              v-for="item in indexRouter"
              :key="item.path"
              :label="item.meta.title"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 状态 -->
        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="update">修 改</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { indexRouter } from "../../../router/index";
import { reqmenuadd, reqmenuedit, reqmenuinfo } from "../../../request/api";
import { successAlert } from "../../../utils/alert";
export default {
  // 接收父元素传来的数据
  props: ["info", "list"],

   data() {
    return {
      form: {
        pid: "",
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      // 图标的数组
      icons: [
        "el-icon-s-tools",
        "el-icon-user-solid",
        "el-icon-s-goods",
        "el-icon-help",
        "el-icon-s-operation",
      ],
      // 路由集合
      indexRouter,
    };
  },

  computed: {
    ...mapGetters({}),
  },

  mounted() {},

  methods: {
    ...mapActions({}),

    // 点击取消
    cancel() {
      this.info.isshow = false;
    },

    // 清空
    empty() {
      this.form = {
        pid: "",
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },

    // 点击添加
    add() {
      //发起添加请求
      reqmenuadd(this.form).then((res) => {
        //添加成功
        if (res.data.code == 200) {
          // 提示成功
          successAlert(res.data.msg);
          // 清空输入框
          this.empty();
          // 关闭输入框
          this.info.isshow = false;
          // 通知父组件列表重新渲染
          this.$emit("init");
        }
      });
    },

    // 获取其中的一条数据
    getOne(id) {
      reqmenuinfo({ id: id }).then((res) => {
        this.form = res.data.list;
        // form此时没有id
        this.form.id = id;
      });
    },

    // 对话框关闭的时候判断要是编辑框就清空
    close() {
      !this.info.isAdd && this.empty();
    },

    // 改变目录
    changePid() {
      // 上一级菜单是0的时候是目录，否则是菜单
      this.form.type = this.form.pid == 0 ? 1 : 2;
    },

    // 点击修改
    update() {
      reqmenuedit(this.form).then((res) => {
        // 成功
        if (res.data.code == 200) {
          // 弹框提示
          successAlert(res.data.msg);
          // 清空
          this.empty();
          // 弹框消失
          this.info.isshow = false;
          // 列表更新
          this.$emit("init");
        }
      });
    },
  },
 
};
</script>
<style lang="less" scoped>
@import "../../../less/index.less";
</style>