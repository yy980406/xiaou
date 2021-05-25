export const actions = {
    // 修改userInfo
    changeUserInfo(context,obj){
        // 提交给mutations
        context.commit("changeUserInfo",obj)

        // 本地存储存一份
        localStorage.setItem("userInfo",JSON.stringify(obj))
    }
}