<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" class="addBtn" @click="willAdd">添加</el-button>
    <!-- 列表 -->
    <v-list :list="list" @edit="edit" @init="init"></v-list>
    <!-- 弹框 -->
    <v-form :info="info" ref="form" :list="list" @init="init"></v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list";
import vForm from "./components/form";
import { reqrolelist } from "../../request/api";
// 混入
import {infoManage} from "../mixins/info"
export default {
  mixins: [infoManage],
  data() {
    return {
      list: [],
    };
  },

  computed: {
    ...mapGetters({}),
  },

  mounted() {
    this.init()
  },

  methods: {
    ...mapActions({}),

    // 一进来就发送请求
    init() {
      // 发送请求，请求列表
      reqrolelist({istree:true}).then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list ? res.data.list : [];
        }
      });
    },
  },
  // 注册子组件
  components: {
    vList,
    vForm,
  },
};
</script>
<style lang="less" scoped>
@import "../../less/index.less";
.addBtn {
  margin-bottom: @btn;
}
</style>