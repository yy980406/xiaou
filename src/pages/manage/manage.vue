<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="willAdd" class="addBtn">添加</el-button>
    <!-- 列表 -->
    <v-list :userList="userList" @edit="edit" @init="initPage"></v-list>
    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="count" :page-size="size" @current-change="changePage">
    </el-pagination>
    <!-- 弹窗 -->
    <v-form :info="info" ref="form" @init="initPage"></v-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { requsercount, requserlist } from "../../request/api";
import vForm from "./components/form";
import vList from "./components/list";
// 混入
import { infoManage } from "../mixins/info";
export default {
  mixins: [infoManage],
  // 注册组件
  components: {
    vForm,
    vList,
  },
  data() {
    return {
      // 管理员列表
      userList: [],
      // 管理员总数
      count:0,
      // 每页显示的个数
      size:2,
      // 默认请求第一页的
      page:1
    };
  },
  methods: {
    ...mapActions({}),
    // 请求列表和总数
    initPage(){
      this.init()
      this.sum()
    },
    init() {
      // 渲染管理员列表
      requserlist({ size: this.size, page: this.page }).then((res) => {
        if (res.data.code == 200) {
          let list = res.data.list ? res.data.list : [];
          // 如果取得这页没有数据，并且他不是第1页，就要取上一页的数据
          if(list.length == 0 && this.page!==1){
            this.page--
            this.init()
            return 
          }
          this.userList = list
        }
      });
    },

    sum(){
      // 请求总数
      requsercount().then(res=>{
        if(res.data.code == 200){
          this.count = res.data.list[0].total
        }
      })
    },

    // 当页面发生变化的时候
    changePage(page){
      this.page = page
      // 重新渲染列表
      this.init()
    }
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {
    this.initPage()
  },
};
</script>
<style lang="less" scoped>
@import "../../less/index.less";
.addBtn {
  margin-bottom: @btn;
}
.el-pagination{
  position: absolute;
  right: 20px;
  top: 400px;
}
</style>