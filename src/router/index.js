import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 导出二级路由规则给menu/form.vue使用
export const indexRouter = [
  { path: 'cate', component: ()=>import('../pages/cate/cate.vue'),meta: { title:"商品分类" }},
  { path: 'banner', component: ()=>import('../pages/banner/banner.vue'),meta: { title:"轮播图管理" }},
  { path: 'goods', component: ()=>import('../pages/goods/goods.vue'),meta:{title:"商品管理"}},
  { path: 'manage', component: ()=>import('../pages/manage/manage.vue'),meta: { title:"管理员管理" }},
  { path: 'member', component: ()=>import('../pages/member/member.vue'),meta: { title:"会员管理" }},
  { path: 'menu', component: ()=>import('../pages/menu/menu.vue'),meta: { title:"菜单管理" }},
  { path: 'role', component: ()=>import('../pages/role/role.vue'),meta: { title:"角色管理" }},
  { path: 'seckill', component: ()=>import('../pages/seckill/seckill.vue'),meta: { title:"秒杀活动" }},
  { path: 'specs', component: ()=>import('../pages/specs/specs.vue'),meta: { title:"商品规格" }},
]

const routes = [
  // 配置一级路由
  { path: '/login', component: () => import('../pages/login/login.vue') },
  {
    path: '/', component: () => import('../pages/index/index.vue'),
    children: [
      { path: 'home', component: ()=>import('../pages/home/home.vue')},

      ...indexRouter,

      { path: '', redirect: "home" },
    ]
  }
]

const router = new VueRouter({
  routes
})

// 设置全局守卫
router.beforeEach((to, from, next) => {
  let islogin = localStorage.getItem("userInfo")

  // 如果去的是登录路由直接进
  if(to.path==="/login"){
    next()
    return 
  }

  // 如果去的不是登录路由，判断登录了才可以进去，否则去登录
  if(islogin){
    next()
    return 
  }
  
   next("/login")
})

export default router
