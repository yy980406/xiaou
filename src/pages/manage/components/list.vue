<template>
  <div>
    <el-table
      :data="userList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <!-- 用户编号 -->
      <el-table-column prop="roleid" label="用户编号" width="180">
      </el-table-column>
      <!-- 用户名 -->
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <!-- 所属角色 -->
      <el-table-column prop="rolename" label="所属角色"> </el-table-column>
      <!-- 状态 -->
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>不启用</el-button>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="willEdit(scope.row.uid)"
            >编辑</el-button
          >
          <del-btn @confirm="del(scope.row.uid)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { requserdelete } from "../../../request/api";
import { successAlert } from "../../../utils/alert";
export default {
  // 接收父元素传过来的数据
  props: ["userList"],
  data() {
    return {};
  },
  methods: {
    ...mapActions({}),
    // 将要编辑
    willEdit(uid) {
      // 通知父元素我点了修改了
      this.$emit("edit", uid);
    },
    // 点击删除
    del(uid) {
      // 发送请求删除
      requserdelete({ uid: uid }).then((res) => {
        if (res.data.code == 200) {
          // 提示删除成功
          successAlert(res.data.msg);
          // 通知父元素重新渲染列表
          this.$emit("init");
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