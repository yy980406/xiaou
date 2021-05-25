<template>
  <div>
    <el-dialog :title="info.isAdd?'用户添加':'用户编辑'" :visible.sync="info.isshow" @closed="close">
      {{form}}
      <el-form :model="form">
        <!-- 所属角色 -->
        <el-form-item label="所属角色" label-width="120px">
          <el-select v-model="form.roleid" placeholder="请选择">
            <el-option v-for="item in list" :key="item.id" :value="item.id" :label="item.rolename"></el-option>
          </el-select>
        </el-form-item>

        <!-- 用户名 -->
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
          <p>留空则不修改</p>
        </el-form-item>

        <!-- 状态 -->
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2">
          </el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="info.isAdd" @click="add">添 加</el-button
        >
        <el-button type="primary" v-else @click="update">修 改</el-button
        >
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqrolelist, requseradd, requseredit, requserinfo } from '../../../request/api';
import { successAlert } from '../../../utils/alert';
export default {
  // 接收父元素的数据
  props: ["info"],
  data() {
    return {
      // 表单数据
      form: {
        roleid:"",
        username:"",
        password:"",
        status:1
      },
      // 角色列表
      list:[]
    };
  },
  methods: {
    ...mapActions({}),
    // 点击取消
    cancel(){
      this.info.isshow = false
    },
    // 清空
    empty(){
      this.form={
        roleid:"",
        username:"",
        password:"",
        status:1
      }
    },
    // 点击添加
    add(){
      // 发送请求
      requseradd(this.form).then(res=>{
        if(res.data.code==200){
          // 弹框提示成功
          successAlert(res.data.msg)
          // 清空弹框中的内容
          this.empty()
          // 弹框关闭
          this.info.isshow = false
          // 通知父元素渲染列表
          this.$emit('init');
        }
      })
    },
    // 获取一条数据
    getOne(uid){
      requserinfo({uid:uid}).then(res=>{
        if(res.data.code == 200){
          this.form = res.data.list
          // 不能让用户看见密码的密文
          this.form.password=""
          // 因为修改的时候要用到uid，此时添加uid
          this.form.uid = uid
        }
      })
    },
    // 点击修改
    update(){
      // 留空则不修改
      if(this.form.password==""){
        return
      }
      // 发送修改请求
      requseredit(this.form).then(res=>{
        if(res.data.code == 200){
          // 提示修改成功
          successAlert(res.data.msg)
          // 清空数据
          this.empty()
          // 关闭弹框
          this.info.isshow = false
          // 通知父组件重新渲染列表
          this.$emit('init');
        }
      })

    },
    // 点击关闭弹框的时候判断是否是编辑，是编辑关闭的话，清空内容
    close(){
      !this.info.isAdd && this.empty()
    }
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {
     // 发起请求，请求列表
     reqrolelist().then(res=>{
       if(res.data.code==200){
         this.list = res.data.list?res.data.list:[]
       }
     })
  },
};
</script>
<style lang="less" scoped>
@import "../../../less/index.less";
</style>