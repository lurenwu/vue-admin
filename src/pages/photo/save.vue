<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="100">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px " size="mini">
            <el-form-item label="姓名:" prop="name">
              <el-input v-model="form.name" placeholder="请输入内容" style="width: 250px;" disabled="disabled"></el-input>
            </el-form-item>
           
            <el-form-item label="案例上传：" prop="example">
               <el-button @click="addDomain">新增案例</el-button>
                <span style="color:red">*请输入对应图片名字的前缀，如fm1.jpg，就输入fm1</span>
            </el-form-item>
            <div v-for="(example, index) in form.exampleList"  
            :label="'域名' + index"
            :key="example.key"
            :prop="'domains' + index " >
              <el-form-item label="封面:"  :prop="'title' + index" >
                <el-input  v-model="example.fm" placeholder="请输入对应图片名字的前缀" style="width: 250px;"></el-input>
              </el-form-item>
              <el-form-item label="主题:"  :prop="'title' + index" >
                <el-input  v-model="example.title1" placeholder="请输入主题" style="width: 250px;"></el-input>
              </el-form-item>
              <el-form-item label="描述:" :prop="'des' + index">
                <el-input v-model="example.des" placeholder="请输入描述" style="width: 250px;"></el-input>
              </el-form-item>
              <el-form-item label="地址:" :prop="'url' + index">
                <el-input v-model="example.url" placeholder="请输入url地址" style="width: 350px;"></el-input>
                <el-button @click.prevent="removeDomain(example)">删除</el-button>   
              </el-form-item>
            </div>
             <el-form-item>
              <el-button type="primary" @click="on_submit_form" :loading="on_submit_loading">立即提交</el-button>
              <el-button @click="$router.back()">取消</el-button>
            </el-form-item>
             <el-form-item style="width:400px">
              <el-upload
                class="upload-demo"
                ref="upload"
                :action="url"

                :data = "datas"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
                :file-list="fileList"
                :auto-upload="false"
                :on-success = "handleSuccess"
                multiple
                >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button> 
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <span style="color:red;display:block">注意：选取文件后要点击上传到服务器方可生效</span>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            
          </el-form>
        </el-col>
      </el-row>
    </div>
  
    <div class="rule">
      <h2>图片取名规则如下</h2>
      <div>人物头像统一命名为tx.jpg或者tx.png</div>
      <div>人物大图片肖像统一命名为bigtx.jpg或者bigtx.png</div>
      <div>正方形图片统一按zfx+序号命名，如有三张图片，按zfx1.png,zfx2.png,zfx3.png</div>
      <div>案例图片统一按fm+序号命名，如有三张图片，按fm1.png,fm2.png,fm3.png</div>
      <p class="lint">* 所有图片只改变图片名字，格式不用改</p>
    </div>
  </div>
</template>
<script type="text/javascript">
import { panelTitle } from "components";
import { server_base_url } from "common/config";
export default {
  data() {
    return {
      form: {
        name: null,
        exampleList: [
          {
            fm:"",
            title1: "",
            des: "",
            url: "",
            key: Date.now()
          }
        ]
      },
      url: server_base_url + "/order.ashx",
      datas: {
        t: "Addword",
        parentId: ""
      },
      route_id: this.$route.params.id,
      load_data: false,
      on_submit_loading: false,
      rules: {
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }]
      },
      fileList: [],

      // fileList: [
      //   {
      //     name: "food.jpeg",
      //     url:
      //       "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
      //   },
      //   {
      //     name: "food2.jpeg",
      //     url:
      //       "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
      //   }
      // ]
    };
  },
  created() {
    this.route_id && this.get_form_data();
    this.route_id && this.getExampleList();
  },
  methods: {
    removeDomain(item) {
      
      var index = this.form.exampleList.indexOf(item);
      if (index !== -1) {
        this.form.exampleList.splice(index, 1);
      }
    },
    addDomain() {
      this.form.exampleList.push(
        {
          fm:"",
          title1: "",
          des: "",
          url: "",
          key: Date.now()
        }
      );
    },
    //获取数据
    get_form_data() {
      this.load_data = true; 
      this.$fetch.api_table
        .getDesignList(
          {"parentId": this.route_id}
        )
        .then(({ data }) => {
          var formData = data.list.filter(item => {
             return item.id === this.route_id;
          })[0];
          this.form = Object.assign({},this.form,formData) ;
          console.log(this.form)
          this.load_data = false; 
          this.get_pic_data();
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    //获取图片数据
    get_pic_data() {
      this.load_data = true;
      this.$fetch.api_table
        .getDesignPic({
          parentId: this.route_id
        })
        .then(({ data }) => {
          this.fileList = data;
          this.load_data = false;
        })
        .catch(() => {
          this.load_data = false;
        });
    },
     //获取案例数据
    getExampleList() {
      // this.load_data = true;
      // this.$fetch.api_table
      //   .getExampleList({
      //     parentId: this.route_id
      //   })
      //   .then(({ data }) => {
      //     this.form.exampleList = data;
      //     this.load_data = false;
      //   })
      //   .catch(() => {
      //     this.load_data = false;
      //   });
    },
    del_pic_data(id) {
      this.load_data = true;
      this.$fetch.api_table
        .delPic({
          id: id
        })
        .then(({ data }) => {
          if (data.zt == "0") {
            this.$message.success("删除成功");
          } else {
            this.$message.success("删除失败");
          }
          this.load_data = false;
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    //时间选择改变时
    on_change_birthday(val) {
      this.$set(this.form, "birthday", val);
    },
    //提交
    on_submit_form() {
      this.$refs.form.validate(valid => {
        if (!valid) return false;
        this.on_submit_loading = true;
        this.form.example = JSON.stringify(this.form.exampleList);
        // this.form.exampleList = [];
        this.$fetch.api_table
          .saveExampleInfo(this.form)
          .then(({ data }) => {
          if (data.zt == "0") {
            this.on_submit_loading = false;
            this.$message.success(data.msg);
            this.load_data = false;
            this.get_form_data();

            // setTimeout(this.$router.back(), 500);
          } else {
            this.$message.success(data.msg);
          }
          this.load_data = false;
          })
          .catch(() => {
            this.on_submit_loading = false;
          });
      });
    },
    submitUpload() {
      this.datas.parentId = this.route_id;

      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.del_pic_data(file.id);
    },
    handlePreview(file) {
      window.location.href = file.url;
      console.log(file);
    },
    handleSuccess(response, file, fileList) {
      if (response.zt === "1") {
        fileList = fileList.filter(item => {
          return item.uid !== file.uid;
        });
        this.fileList = fileList;
        this.$message.success("上传成功");
        this.get_pic_data();
      } else {
        this.$message.error("上传失败，请联系管理员");
      }
    },
    beforeAvatarUpload(file) {
      console.log(file.type);
      const isCorrectGeshi =
        "image/jpeg|image/jpg|image/png".indexOf(file.type) > -1;
      const isPng = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 0.7;
      if (!isCorrectGeshi) {
        this.$message.error("上传图片只能是 JPG 或者 png格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 700KB!");
      }
      return isCorrectGeshi && isLt2M;
    }
  },
  components: {
    panelTitle
  }
};
</script>
<style lang="scss">
.rule {
  padding: 50px;
  position: absolute;
  right: 0;
  top: 107px;
  h2 {
    padding: 20px 0;
  }
  .lint {
    padding: 20px 0;
    color: red;
  }
}
</style>