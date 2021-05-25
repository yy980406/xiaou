import { reqspecscount, reqspecslist } from "../../request/api"

let state = {
    // 列表
    list: [],
    // 页码
    page: 1,
    // 每一页的个数
    size: 2,
    // 总数
    total:0
}

let mutations = {
    changeList(state, arr) {
        state.list = arr
    },

    // 改变页码
    changePage(state, num) {
        state.page = num
    },

    // 改变总数
    changeTotal(state,num){
        state.total = num
    }

}

let actions = {
    // 发送请求
    reqList({ commit,dispatch,state: { size, page } }) {
        reqspecslist({ size: size, page: page }).then(res => {
            if (res.data.code == 200) {
                let list = res.data.list ? res.data.list : []

                if(list.length == 0 && page !== 1){
                    commit("changePage",page-1)
                    dispatch("reqList")
                    return
                }

                commit("changeList", list)
            }
        })
    },

    // 请求总数
    reqSum({ commit }) {
        reqspecscount().then(res => {
            if (res.data.code == 200) {
                commit("changeTotal",res.data.list[0].total)
            }
        })
    },

    // 改变页码
    changePage({ commit,dispatch }, num) {
        // 修改页码
        commit("changePage",num)
        // 重新请求
        dispatch("reqList")
    }

}
let getters = {
    list(state) {
        return state.list
    },
    page(state) {
        return state.page
    },
    size(state) {
        return state.size
    },
    total(state){
        return state.total
    }
}


export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}