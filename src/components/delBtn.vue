<template>
  <el-button type="danger" @click="willDel()">删除</el-button>
</template>

<script>
export default {
  methods: {
    // 点击删除
    willDel(id) {
      this.$confirm("你确定要删除吗?", "删除提示", {
        cancelButtonText: "取消",
        confirmButtonText: "删除",
        type: "warning",
      })
        .then(() => {
         this.$emit('confirm');
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
</style>