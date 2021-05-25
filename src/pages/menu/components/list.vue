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
      <el-table-column prop="id" label="菜单编号" width="120">
      </el-table-column>

      <!-- 菜单名称 -->
      <el-table-column prop="title" label="菜单名称" width="120">
      </el-table-column>

      <!-- 菜单图标 -->
      <el-table-column prop="icon" label="菜单图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>

      <!-- 菜单地址 -->
      <el-table-column prop="url" label="菜单地址"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1">是</el-button>
          <el-button type="info" v-else>否</el-button>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="willEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" @click="willDel(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqmenudelete } from '../../../request/api';
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
    willDel(id) {
      this.$confirm("你确定要删除吗?", "删除提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      }).then(()=>{
        // 调用删除请求
        reqmenudelete({id:id}).then(res=>{
          if(res.data.code==200){
            // 弹框提示成功
            successAlert(res.data.msg)
            // 重新请求list
            this.$emit('init');
          }
        })
      }).catch(()=>{
        this.$message({
            type: "info",
            message: "已取消删除",
          });
      })

    },
  },
};
</script>
<style lang="less" scoped>
@import "../../../less/index.less";
</style>