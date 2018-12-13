<template>
  <div class="login">
  <div class="w3ls-login box">
    <!-- form starts here -->
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h1>医疗住院管理系统</h1>
      <div class="agile-field-txt">
      <el-form-item prop="staffName">
        <el-input type="text" v-model="ruleForm2.staffName" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      </div>
      <div class="agile-field-txt">
        <el-form-item prop="password">
          <el-input type="text" v-model="ruleForm2.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
      </div>
      <el-button  size="small" type="danger" v-show="isLogin" style="margin:5px;">用户或或密码错误</el-button>
      <div class="w3ls-bot"><el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
      </el-form-item>
      </div>

    </el-form>
    <img src="./logo.png" alt="logo_img" width="300" height="300"/>
  </div>
  </div>
  <!--<div class="login">
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">医疗管理系统</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="ruleForm2.username" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-button  size="small" type="danger" v-show="isLogin" style="margin:5px;">用户或或密码错误</el-button>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
        &lt;!&ndash;<el-button @click.native.prevent="handleReset2">重置</el-button>&ndash;&gt;
      </el-form-item>
    </el-form>
    <el-pagination
            background
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :page-size="3"
            :total="4">
    </el-pagination>
  </div>-->
</template>

<script>
  import {mapGetters} from 'vuex'
  import {saveUser} from '../../static/js/cache'
  import {host} from '../../static/js/common'
  export default {
    data() {
      return { isLogin:'',
          logining:false,
          ruleForm2: {
              staffName: '',
              password: ''
          },
          rules2: {
              staffName: [
                  { required: true, message: '请输入账号', trigger: 'blur' },
                  //{ validator: validaePass }
              ],
              password: [
                  { required: true, message: '请输入密码', trigger: 'blur' },
                  //{ validator: validaePass2 }
              ]
          },
          checked: true
      }
    },
      computed: {
          // 使用对象展开运算符将 getters 混入 computed 对象中
          ...mapGetters([
              'getIsLogin',
              // ...
          ])
      },
      methods: {
          handleReset2() {
              this.$refs.ruleForm2.resetFields();
          },
          handleSubmit2() {
              this.$refs.ruleForm2.validate((valid) => {
                  if (valid) {
                      this.$ajax.post(`${host}/staff/get`,this.ruleForm2)
                          .then(res=>{
                               let staff = res.data
                               if(staff.staffName === this.ruleForm2.staffName){
                                  if(staff.password === this.ruleForm2.password){
                                      //登录成功把用户名存入sessionStorage
                                      //saveUser(staff)
                                      //登录成功把用户存入store
                                      this.$store.dispatch('setIsLogin',true);
                                      this.$store.dispatch('setUser',staff)
                                      this.$router.push('/main');
                                  }else{
                                      this.$message.error('密码错误');
                                  }
                               }else{
                                   this.$message.error('帐户不存在');
                               }
                          })
                  } else {
                      return false;
                  }
              });
          }
      }
  }

</script>

<style >
  @import "./style.css";
/*
  .login-container {
    !*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*!
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }*/

</style>
