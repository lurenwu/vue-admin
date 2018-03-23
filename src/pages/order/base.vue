<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <input placeholder="请输入客户姓名搜索" v-model="search" class="search"> 
      <input placeholder="请输入设计师姓名搜索" v-model="searchDesign" class="search"> 
    </panel-title>
    <div class="panel-body">
      <el-table
        :data="table_data"
        v-loading="load_data"
        element-loading-text="拼命加载中"
        border
        @selection-change="on_batch_select"
        style="width: 100%;">
     
       <el-table-column
        prop="id"
        label="编号"
        width="180"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号码"
        >
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
       >
      </el-table-column>
       <!-- <el-date-picker
                v-model="form.birthday"
                type="date"
                format="yyyy-MM-dd"
                :editable="false"
                @change="on_change_birthday"
                placeholder="选择生日"
                style="width: 250px;">
              </el-date-picker> -->
      <el-table-column
        prop="designName"
        label="预约设计师"
        >
      </el-table-column>
        
      <!-- <el-table-column
        prop="address"
        label="地址">
      </el-table-column> -->
        <!-- <el-table-column
          label="操作"
          width="180">
          <template scope="props">
            <router-link :to="{name: 'tableUpdate', params: {id: props.row.id}}" tag="span">
              <el-button type="info" size="small" icon="edit">修改</el-button>
            </router-link>
            <el-button type="danger" size="small" icon="delete" @click="delete_data(props.row)">删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <bottom-tool-bar> 
        <div slot="page">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="length"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </bottom-tool-bar>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle, bottomToolBar} from 'components'

  export default{
    data(){
      return {
        table_data: null,
        //当前页码
        currentPage: 1,
        //数据总条目
        total: 0,
        //每页显示多少条数据
        length: 15,
        //请求时的loading效果
        load_data: true,
        //批量选择数组
        batch_select: [],
        search:'',
        searchDesign:''
      }
    },
    components: {
      panelTitle,
      bottomToolBar
    },
    created(){
      this.get_table_data()
    },
    watch: {
      search(newVal, oldVal){
        this.get_table_data()
      },
      searchDesign(newVal, oldVal){
        this.get_table_data()
      }
    },
    methods: {
      //刷新
      on_refresh(){
        this.get_table_data()
      },
      //获取数据
      get_table_data(){
        
        this.load_data = true;
        this.$fetch.api_table.getOrderList({
          page: this.currentPage,
          length: this.length,
          search: this.search,
          searchDesign: this.searchDesign
        })
          .then(data => {
            
            this.table_data = data.data.list;
            this.currentPage = this.currentPage;
            this.total = data.data.count;
            this.load_data = false
          })
          .catch(() => {
            this.load_data = false
          })
      },
      //单个删除
      delete_data(item){
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.load_data = true
            this.$fetch.api_table.del(item)
              .then(({msg}) => {
                this.get_table_data()
                this.$message.success(msg)
              })
              .catch(() => {
              })
          })
          .catch(() => {
          })
      },
      //页码选择
      handleCurrentChange(val) {
        this.currentPage = val
        this.get_table_data()
      },
      //批量选择
      on_batch_select(val){
        this.batch_select = val
      },
      //批量删除
      on_batch_del(){
        this.$confirm('此操作将批量删除选择数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.load_data = true
            this.$fetch.api_table.batch_del(this.batch_select)
              .then(({msg}) => {
                this.get_table_data()
                this.$message.success(msg)
              })
              .catch(() => {
              })
          })
          .catch(() => {
          })
      }
    }
  }
</script>
<style>
.search {

  border: 1px solid #9E9E9E;
  height: 25px;
  padding-left: 8px;
}
</style>