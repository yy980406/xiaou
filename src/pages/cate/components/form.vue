<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '商品分类添加' : '商品分类编辑'"
      :visible.sync="info.isshow" @closed="close">
      {{ form }}
      <el-form :model="form">
        <!-- 上级分类 -->
        <el-form-item label="上级分类" label-width="120px">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="请选择" value=""> </el-option>
            <el-option label="顶级分类" :value="0"> </el-option>
            <el-option
              :label="item.catename"
              :value="item.id"
              v-for="item in list"
              :key="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 分类名称 -->
        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 图片 -->
        <el-form-item label="图片" label-width="120px">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="update">修 改</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { errorAlert, successAlert } from "../../../utils/alert";
// 引入path模块
import path from "path";
import { reqcateadd, reqcateedit, reqcateinfo } from "../../../request/api";
export default {
  // 接收父元素传过来的数据
  props: ["info"],
  data() {
    return {
      dialogFormVisible: true,
      form: {
        pid: "",
        catename: "",
        // 不确定什么类型用null
        img: null,
        status: 1,
      },
      // 图片选中的路径
      imageUrl: "",
    };
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList",
    }),

    // 图片上传之前
    beforeAvatarUpload(file) {
      // 如果图片大于2M，不能上传  file.size 单位是B 1M=1024KB  1KB=1024B
      if (file.size > 2 * 1024 * 1024) {
        errorAlert("文件最大不能超过2M");
        return;
      }
      // 判断文件的类型是否是图片类型
      // 图片的后缀名数组
      let imgArr = [".png", ".jpg", ".jpeg", ".gif"];
      // 获取上传文件的后缀名
      let extname = path.extname(file.name);

      if (!imgArr.find((item) => item == extname)) {
        errorAlert("请上传正确的文件格式!");
        return;
      }

      // 将文件生成一个地址，给imgUrl展示(给用户看的)
      this.imageUrl = URL.createObjectURL(file);

      // 将文件赋值给form.img传给后端
      this.form.img = file;
    },

    // 点击取消
    cancel() {
      this.info.isshow = false;
    },

    // 清空工作
    empty() {
      this.form = {
        pid: "",
        catename: "",
        // 不确定什么类型用null
        img: null,
        status: 1,
      },
        // 图片选中的路径
      this.imageUrl = ""
    },

    // 点击添加
    add() {
      // 发送请求
      reqcateadd(this.form).then((res) => {
        if (res.data.code == 200) {
          // 提示用户成功
          successAlert(res.data.msg);
          // 清空表单
          this.empty();
          // 弹框关闭
          this.info.isshow = false;
          // 刷新列表
          this.reqList();
        }
      });
    },

    // 获取一条数据
    getOne(id) {
      // 发送请求
      reqcateinfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          // 让图片展示
          this.imageUrl = this.$pre + this.form.img;

          // 此时form没有id，修改的时候要用，这里加一个id字段
          this.form.id = id;
        }
      });
    },

    // 点击修改
    update() {
      // 发送请求
      reqcateedit(this.form).then((res) => {
        if (res.data.code == 200) {
          // 提示用户成功
          successAlert(res.data.msg);
          // 清空表单
          this.empty();
          // 弹框消失
          this.info.isshow = false;
          // 重新渲染列表
          this.reqList();
        }
      });
    },

    // 关闭的时候判断是编辑的话就清空内容
    close(){
      !this.info.isAdd && this.empty()
    }
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
@import "../../../less/index.less";
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>