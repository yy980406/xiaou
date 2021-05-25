<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '规格添加' : '规格编辑'"
      :visible.sync="info.isshow"
    >
      {{form}} {{specs}}
      <el-form :model="form">
        <!-- 规格名称 -->
        <el-form-item label="规格名称" label-width="120px">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 规格属性 -->
        <el-form-item label="规格属性" label-width="120px" v-for="(item,index) in specs" :key="index">
          <div class="attr">
            <el-input v-model="item.value" autocomplete="off"></el-input>
            <el-button type="primary" v-if="index==0" @click="addAttr">新增规格属性</el-button>
             <el-button type="danger" v-else @click="delAttr(index)">删除</el-button>
          </div>
        </el-form-item>
   
    
        <!-- 状态 -->
        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="info.isAdd" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqspecsadd, reqspecsedit, reqspecsinfo } from '../../../request/api';
import { successAlert } from '../../../utils/alert';
export default {
  // 接收父组件的数据
  props: ["info"],
  data() {
    return {
      dialogFormVisible: true,
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      // 定义一个数组，存储规格的
      specs:[{value:""}]
    };
  },
  methods: {
    ...mapActions({
      reqList:"specs/reqList",
      reqSum :"specs/reqSum"
    }),
    // 点击取消
    cancel(){
      this.info.isshow = false
    },

    // 增加一个属性
    addAttr(){
      this.specs.push({value:""})
    },

    // 删除指定的属性
    delAttr(index){
      this.specs.splice(index,1)
    },

    // 清空
    empty(){
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      },
      // 定义一个数组，存储规格的
      this.specs = [{value:""}]
    },

    // 点击添加
    add(){
      // 把数组中的数据取出来赋值给attrs
      let str = this.specs.reduce((val,item)=>(val+=item.value+","),"")
      this.form.attrs = str.slice(0,str.length-1)
     
      // 发送请求
      reqspecsadd(this.form).then(res=>{
        if(res.data.code == 200){
          // 提示成功
          successAlert(res.data.msg)
          // 清空表单
          this.empty()
          // 弹框消失
          this.info.isshow = false
          // 重新渲染列表
          this.reqList()
          // 重新获取页码
          this.reqSum()
        }
      })
    },

    // 获取一条数据
    getOne(id){
      reqspecsinfo({id:id}).then(res=>{
         if(res.data.code == 200){
           // 取出来的值赋值给form  
           this.form = res.data.list[0]
           // 将form中的attrs赋值给specs
           this.specs = this.form.attrs.map((item)=>({value:item}))
           // 此时form中没有id, 修改要用，所以给form添加一个id
           this.form.id = id  
         }
      })
    },

    // 点击修改
    update(){
      // 因为此时attrs是个数组，要转成字符串
      let str = this.specs.reduce((val,item)=>(val+=item.value+","),"")
      this.form.attrs = str.slice(0,str.length-1)

      reqspecsedit(this.form).then(res=>{
        if(res.data.code == 200){
          // 提示修改成功
          successAlert(res.data.msg)
          // 清空
          this.empty()
          // 弹框消失
          this.info.isshow = false
          // 重新发起请求列表
          this.reqList()
          // 请求页码
          this.reqSum()
        }
      })
    }

  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
@import "../../../less/index.less";
.attr {
  display: flex;
}

.el-input {
  flex: 1;
}
</style>3