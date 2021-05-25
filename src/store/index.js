import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 引入
import {state,mutations,getters} from "./mutations"
import {actions} from "./actions"
import cate from "./modules/cate"
import specs from "./modules/specs"

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    cate,
    specs
  }
})
