<template>
  <div>
    <!-- 列表 -->
    <v-list @edit="edit"></v-list>
    <!-- 弹窗 -->
    <v-form :info="info" ref="form"></v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vForm from "./components/form"
import vList from "./components/list"
import {infoManage} from "../mixins/info"
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
    vForm,
    vList
  }
};
</script>
<style lang="less" scoped>
@import "../../less/index.less";
</style>