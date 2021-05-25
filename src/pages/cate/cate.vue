<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" class="addBtn" @click="willAdd">添加</el-button>
    <!-- 列表 -->
    <v-list @edit="edit"></v-list>
    <!-- 表单 -->
    <v-form :info="info" ref="form"></v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list"
import vForm from "./components/form"
import { infoManage } from "../mixins/info"
export default {
  // 混入
  mixins: [infoManage],
  computed: {
    ...mapGetters({}),
  },
  mounted() {},
  methods: {
    ...mapActions({}),
  },
  // 注册子组件
  components: {
    vList,
    vForm
  }
};
</script>
<style lang="less" scoped>
@import "../../less/index.less";
.addBtn{
  margin-bottom: @btn;
}
</style>