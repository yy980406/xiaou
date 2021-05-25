<template>
  <div>
    <el-container class="con">
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-menu
          class="el-menu-vertical-demo"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          unique-opened
        >
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统设置</span>
            </template>

            <el-menu-item-group>
              <el-menu-item index="/menu">菜单管理</el-menu-item>
              <el-menu-item index="/role">角色管理</el-menu-item>
              <el-menu-item index="/manage">管理员管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          

         <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>商城管理</span>
            </template>

            <el-menu-item-group>
              <el-menu-item index="/cate">商品分类</el-menu-item>
              <el-menu-item index="/specs">商品规格</el-menu-item>
              <el-menu-item index="/goods">商品管理</el-menu-item>
              <el-menu-item index="/member">会员管理</el-menu-item>
              <el-menu-item index="/banner">轮播图管理</el-menu-item>
              <el-menu-item index="/seckill">秒杀活动</el-menu-item>
            </el-menu-item-group>
          </el-submenu> 
          
          
          <!-- <el-submenu index="2" v-for="item in user.menus" :key="item.id"> 
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>

          <el-menu-item-group>
              <el-menu-item :index="item1.url" v-for="item1 in item.children" :key="item1.id">{{item1.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header>Header</el-header>
        <!-- main部分 -->
        <el-main>
          <!-- 面包屑导航 -->
          <el-breadcrumb
            separator-class="el-icon-arrow-right"
            v-if="$route.meta.title"
          >
            <el-breadcrumb-item :to="{ path: '/home' }"
              >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由的出口 -->
          <router-view class="view"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      user: "userinfo",
    }),
  },
  mounted() {},
  methods: {
    ...mapActions({}),
  },
};
</script>
<style lang="less" scoped>
@import "../../less/index.less";

.el-header,
.el-menu-item:hover,
/deep/ .el-submenu__title:hover {
  background: @header-color;
}

.el-aside,
.el-menu-vertical-demo,
.el-menu-item-group {
  background: @primary2;
}

.con {
  height: 100vh;
}

.view {
  margin-top: 20px;
}
</style>