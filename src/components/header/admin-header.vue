<!--后台管理页面-->
<template>
  <div class="home">
    <div>
      <header>
        <div class="logo">
          <div class="adv"></div>
          <div class="title">医疗住院管理系统</div>
        </div>
        <div class="info" id="test">
          <div class="child current">
            <div class="date"></div>
            <div class="time">
                  <div class="user">
                     <el-dropdown trigger="hover">
                      <span class="el-dropdown-link userinfo-inner">
                          {{this.sysUserName}}
                      </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item>我的消息</el-dropdown-item>
                          <el-dropdown-item>设置</el-dropdown-item>
                          <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                  </div>
                  <div class="user">
                    <el-dropdown trigger="hover">
                      <span class="el-dropdown-link userinfo-inner">
                          {{this.sysUserRole|formatRole}}
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>我的消息</el-dropdown-item>
                        <el-dropdown-item>设置</el-dropdown-item>
                        <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
              <div>

              </div>
            </div>
          </div>
        </div>
      </header>
      <!--<header class="head-nav">
        <el-row>
          <el-col :span="4">
            <div class="logo-title">
              <h1>医疗管理系统</h1>
            </div>
          </el-col>
          <el-col :span="4" class="userinfo">
            <el-dropdown trigger="hover">
              <span class="el-dropdown-link userinfo-inner">
                  <img src="../../assets/logo.png" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>我的消息</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </header>-->



    </div>

  </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {loadUser,delAllItemHistory} from '../../static/js/cache'
    export default {
      data() {
          return {
              sysUserName: '',
              sysUserRole: '',
          }
      },
    mounted(){
        var user = this.user
        if (user) {
            this.sysUserName = user.staffName || '';
            this.sysUserRole = user.role || '';
        }
    } ,
    methods:{
      logout:function(){ //退出
          //delAllItemHistory()
          this.$store.dispatch('setUser',{})
          this.$store.dispatch('setIsLogin',false);
          this.$router.push('/');
      }
    },
    filters:{
          formatRole: function(role){
              let res = ''
              switch(role){
                  case '1':
                      res = '医生'
                      break;
                  case '2':
                      res = '护士'
                      break;
                  case '3':
                      res = '操作员'
                      break;
                  case '4':
                      res = '管理员'
                      break;
              }
              return res
          }
      },
      computed: {
          ...mapState(['user'])
      }
  }
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  header{
    height: 90px;
    display: flex;
    justify-content: space-between;
    background: url("header.jpg") 0 0 no-repeat;
    background-size: 100% 100%;

  }
  header .logo{
    display: flex;
    margin-left: 30px;
    width: 40%;
    height: 90px;
    line-height: 90px;
    font-size: 26px;
    font-weight: bolder;
    color: rgb(255, 255, 255);

  }

  header .logo .title {
    margin-left: 5px;
  }

  header .logo .adv {
    width: 40px;
    height: 90px;
    background: url('../../assets/logo.png') no-repeat center center;
  }

  header .info {
    width: 20%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
  }
  header .info .child{
    width: 60%;
    text-align: right;
  }
  .child.user{
    font-size: 24px;
    font-weight: 400;
  }

  .time {
    display: flex;
    height: 90px;
    line-height: 90px;
  }

  .time .user {
    padding: 5px 0 0 5px;
  }

  .time .userinfo-inner {
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    color: #fff;
  }







</style>
