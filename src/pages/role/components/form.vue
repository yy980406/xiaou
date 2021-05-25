<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '角色添加' : '角色编辑'"
      :visible.sync="info.isshow"
      @closed="close">
      {{form}}
      <el-form :model="form">
        <!-- 菜单名称 -->
        <el-form-item label="角色名称" label-width="120px">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 上级菜单 -->
        <el-form-item label="角色权限" label-width="120px">
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
        </el-form-item>

        <!-- 状态 -->
        <el-form-item label="状态" label-width="formLabelWidth">
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
import {
  reqmenulist,
  reqroleadd,
  reqroleedit,
  reqroleinfo,
} from "../../../request/api";
import { successAlert } from "../../../utils/alert";
export default {
  props: ["info", "list"],
  computed: {
    ...mapGetters({}),
  },
  mounted() {
    reqmenulist({ istree: true }).then((res) => {
      if (res.data.code == 200) {
        this.data = res.data.list ? res.data.list : [];
      }
    });
  },
  methods: {
    ...mapActions({}),
    // 点击取消
    cancel() {
      this.info.isshow = false;
    },
    // 清空
    empty() {
      // 清空表单
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };
      // 清空树上的选项
      this.$refs.tree.setCheckedKeys([])
    },
    // 点击添加
    add() {
      // menu字段没有值，把data取出来树型中选中的值赋值给menu
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      //发起添加请求
      reqroleadd(this.form).then((res) => {
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
      reqroleinfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          // form此时没有id
          this.form.id = id;
          // 把menus赋值给树
          this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus))
        }
      });
    },

    // 对话框关闭的时候判断要是编辑框就清空
    close() {
      !this.info.isAdd && this.empty();
    },

    // 点击修改
    update() {
      this.form.menus=JSON.stringify(this.$refs.tree.getCheckedKeys())
      reqroleedit(this.form).then((res) => {
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
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      // 菜单的列表
      data: [],
    };
  },
};
</script>
<style lang="less" scoped>
@import "../../../less/index.less";
</style>