<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180"> </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>不启用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqmemberlist } from '../../../request/api';
export default {
  data() {
    return {
      value: "",
      // 会员列表
      list:[]
    };
  },
  methods: {
    ...mapActions({}),
    // 点击编辑
    edit(uid){
      // 通知父组件我要编辑了
      this.$emit('edit', uid);
    }
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {
    // 请求会员列表
    reqmemberlist().then(res=>{
        if(res.data.code == 200){
            this.list = res.data.list ? res.data.list : []
        }
    })
  },
};
</script>
<style lang="less" scoped>
@import "../../../less/index.less";
</style>