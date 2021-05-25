<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <!-- 菜单编号 -->
      <el-table-column prop="id" label="角色编号" width="120">
      </el-table-column>

      <!-- 菜单名称 -->
      <el-table-column prop="rolename" label="角色名称" width="120">
      </el-table-column>

      <!-- 状态 -->
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1">启用</el-button>
          <el-button type="info" v-else>不启用</el-button>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="willEdit(scope.row.id)"
            >编辑</el-button
          >
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqroledelete } from '../../../request/api';
import { successAlert } from '../../../utils/alert';
export default {
  // 接收父元素的list传过来的值
  props: ["list"],

  computed: {
    ...mapGetters({}),
  },

  mounted() {},

  methods: {
    ...mapActions({}),

    // 点击编辑
    willEdit(id) {
      // 通知父组件我要编辑了
      this.$emit("edit", id);
    },

    // 点击删除
    del(id) {
        // 调用删除请求
        reqroledelete({id:id}).then(res=>{
          if(res.data.code==200){
            // 弹框提示成功
            successAlert(res.data.msg)
            // 重新请求list
            this.$emit('init');
          }
        })
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../../less/index.less";
</style>