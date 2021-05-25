<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <!-- 分类编号 -->
      <el-table-column prop="id" label="分类编号"> </el-table-column>
      <!-- 分类名称 -->
      <el-table-column prop="catename" label="分类名称"> </el-table-column>
      <!-- 图片 -->
      <el-table-column prop="name" label="图片">
        <template slot-scope="scope">
          <img :src="$pre+scope.row.img" alt="" >
        </template>
      </el-table-column>
      <!-- 状态 -->
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>不启用</el-button>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)">删除</del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqcatedelete } from '../../../request/api';
import { successAlert } from '../../../utils/alert';
export default {
  data() {
    return {
     
    };
  },
  methods: {
    ...mapActions({
      reqList:"cate/reqList"
    }),

    // 点击编辑按钮
    edit(id){
      // 通知父组件我要编辑了
      this.$emit('edit', id);
    },

    // 点击删除
    del(id){
      // 发送请求
      reqcatedelete({id}).then(res=>{
         if(res.data.code == 200){
           // 提示删除成功  
           successAlert(res.data.msg)
           // 重新刷新列表
           this.reqList()
         }
      })
    }
  },
  computed: {
    ...mapGetters({
      list:"cate/list"
    }),
  },
  mounted() {
    // 一进来就请求列表
    this.reqList()
  },
};
</script>
<style lang="less" scoped>
@import "../../../less/index.less";
img{
  width: 80px;
  height: 80px;
}
</style>