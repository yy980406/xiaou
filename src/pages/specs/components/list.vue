<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180">
      </el-table-column>
      <el-table-column prop="address" label="规格属性">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.attrs" :key="item">{{
            item
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="info" v-else>不启用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="size" @current-change="changePage">
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqspecsdelete } from "../../../request/api";
import { successAlert } from "../../../utils/alert";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
      changePage:"specs/changePage",
      reqSum:"specs/reqSum"
    }),

    // 点击编辑
    edit(id) {
      // 通知父元素我要编辑了
      this.$emit("edit", id);
    },

    // 点击删除
    del(id) {
      // 发送删除的请求
      reqspecsdelete({ id: id }).then((res) => {
        if (res.data.code == 200) {
          // 提示删除成功
          successAlert(res.data.msg);
          // 重新刷新列表
          this.reqList();
          // 重新请求总数
          this.reqSum()
        }
      });
    },
  },
  computed: {
    ...mapGetters({
      list: "specs/list",
      size:"specs/size",
      page:"specs/page",
      total:"specs/total"
    }),
  },
  mounted() {
    this.reqList();
    // 总数
    this.reqSum()
  },
};
</script>
<style lang="less" scoped>
@import "../../../less/index.less";
</style>