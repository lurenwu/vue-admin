<template>
  <div class="left-side">
    <div class="left-side-inner">
      <router-link to="/" class="logo block">
        <img src="./images/logo.png" alt="AdminX">
      </router-link>
       <el-menu
        class="menu-box"
        theme="dark"
        router
        :default-active="$route.path">
        <div
          v-for="(item, index) in SET_ROUTERS[0].children"
          :key="index" v-if="item.meta.isShow">
          <el-menu-item
            class="menu-list"
            v-if="typeof item.children === 'undefined' " 
            :index="item.path"
           >
            <i class="icon fa" :class="item.icon"></i>
            <span v-text="item.meta.title" class="text"></span>
          </el-menu-item>
          <el-submenu
            :index="item.path"
            v-else>
            <template slot="title">
              <i class="icon fa" :class="item.icon"></i>
              <span v-text="item.meta.title" class="text"></span>
            </template>
            <el-menu-item
              class="menu-list"
              v-for="(sub_item, sub_index) in item.children"
              :index="sub_item.path"
              :key="sub_index"
              v-if="sub_item.meta.isShow">
              <!--<i class="icon fa" :class="sub_item.icon"></i>-->
              <span v-text="sub_item.meta.title" class="text"></span>
            </el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
   
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex';

  export default{
    name: 'slide',
    data(){
      return {
        nav_menu_data: [{
          title: "设计师",
          path: "/table",
          icon: "fa-table",
          role: 'admin',
          child: [{
            title: "管理设计师",
            path: "/table/base"
          }]
        },
        {
          title: "订单管理",
          path: "/order",
          icon: "fa-table",
          role: 'admin,user',
          child: [{
            title: "订单列表",
            path: "/order/base"
          }]
        }
        ]
      }
    },
    computed: {
       ...mapGetters([
        'SET_ROUTERS'
    ])
    }
  }
</script>
