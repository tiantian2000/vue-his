<!--后台管理页面-->
<template>
  <div class="admin">
      <admin-header></admin-header>
    <div class="right">
      <div class="left-menu">
        <main-menu></main-menu>
      </div>
      <div class="right_content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import AdminHeader from '../header/admin-header.vue'
  import MainMenu from './admin-menu.vue'

  export default {
    name: 'app',
    components:{
      'admin-header':AdminHeader,
      'main-menu':MainMenu
    }
  }
</script>

<style>

  .right {
/*    margin-top: 80px;*/
    display: flex;
  }

 .left-menu {
   height:100%;
   width:15%;
 }

 .right_content {
   height:100%;
   flex:1;

 }



</style>
