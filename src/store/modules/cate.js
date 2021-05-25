import { reqcatelist } from "../../request/api"

// 状态
let state = {
    list: []
}
// 修改状态
let mutations = {
    changeList(state, arr) {
        state.list = arr
    }
}
// 操作逻辑和异步
let actions = {
    // 发送请求
    reqList({ commit }) {
        reqcatelist({ istree: true }).then(res => {
            if (res.data.code == 200) {
                let list = res.data.list ? res.data.list : []
                // 让mutations修改list的值
                commit("changeList", list)
            }
        })
    }

}
// 导出数据
let getters = {
    list(state) {
        return state.list
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    // 命名空间
    namespaced: true
}