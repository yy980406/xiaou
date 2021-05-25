// 混入
export let infoManage = {
    data() {
        return {
            // 控制弹框显示和弹框标题
            info: {
                isshow: false,
                isAdd: true
            },
        }
    },
    methods: {
        // 点击添加
        willAdd() {
            this.info.isshow = true
            this.info.isAdd = true
        },

        // 子组件点击编辑
        edit(id) {
            this.info.isshow = true
            this.info.isAdd = false
            // 通知form取数据
            this.$refs.form.getOne(id)
        },
    }
}