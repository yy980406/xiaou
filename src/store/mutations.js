export const state = {
    userinfo:localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):{}
}
export const mutations = {
    changeUserInfo(state,obj){
        state.userinfo = obj
    }
}
export const getters = {
    userinfo(state){
        return state.userinfo
    }
}