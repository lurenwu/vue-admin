<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="100">
          <el-form ref="form" :inline="true" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="姓名:" prop="name">
              <el-input v-model="form.name" placeholder="请输入姓名" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="" > 
            </el-form-item>
            <el-form-item label="地区:" prop="area">
              <el-input v-model="form.area" placeholder="请输入地区" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="荣誉:" prop="honor">
              <el-input v-model="form.honor" placeholder="请输入荣誉" style="width: 350px;"></el-input>
            </el-form-item>
            <el-form-item label="介绍:" prop="introduce">
              <el-input type="textarea" v-model="form.introduce" style="width: 550px;"></el-input>
            </el-form-item>
            <el-form-item >
              
            </el-form-item>
            <el-form-item label="明星导师:">
              <el-radio-group v-model="form.isRefer">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="称谓:" prop="referName" style="width: 650px;" v-show="form.isRefer === 1">
              <el-input v-model="form.referName" placeholder="请输入称谓" style="width: 350px;" ></el-input>
            </el-form-item>
            <el-form-item label="排序序号:" prop="orderBy" style="width: 650px;">
              <el-input v-model="form.orderBy" placeholder="请输入排序序号" style="width: 350px;"></el-input>
            </el-form-item>
            <el-form-item style="margin-left:100px;">
              <el-button type="primary" @click="on_submit_form" :loading="on_submit_loading">立即提交</el-button>
              <el-button @click="$router.back()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
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
        isRefer: 0
        // sex: 1,
        // age: 20,
        // birthday: this.$dateFormat(new Date, "yyyy-MM-dd"),
        // address: null,
        // zip: 412300
      },
      url: server_base_url + "/order.ashx",
      datas: {
        t: "Addword",
        parentId: "",
      },
      route_id: this.$route.params.id,
      load_data: false,
      on_submit_loading: false,
      rules: {
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
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
    // this.route_id && this.get_pic_data()
  },
  methods: {
    //获取数据
    get_form_data() {
      this.load_data = true;
      this.$fetch.api_table
        .getDesignList({
          "parentId": this.route_id,
          page: 1,
          length: 15
          })
        .then(({ data }) => {
          this.form = data.list.filter(item => {
            return item.id === this.route_id;
          })[0];
          this.load_data = false;
          this.get_pic_data () ;
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
        this.$fetch.api_table
          .saveDesignInfo({
            name: this.form.name,
            id: this.route_id,
            area: this.form.area,
            honor: this.form.honor,
            introduce: this.form.introduce,
            isRefer: this.form.isRefer,
            referName: this.form.referName,
            orderBy: this.form.orderBy
          })
          .then(({ data }) => {
            this.$message.success(data.msg);
            setTimeout(this.$router.back(), 500);
          })
          .catch(() => {
            this.on_submit_loading = false;
          });
      });
    },
   
  },
  components: {
    panelTitle
  }
};
</script>
