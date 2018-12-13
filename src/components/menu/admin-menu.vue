<template>

    <el-row class="tac">
      <el-col :span="24">
        <el-menu mode="vertical" default-active="1" class="el-menu-vertical-demo">
          <el-menu-item-group title="基本设置">
            <el-menu-item index="1" @click="dept"><i class="el-icon-news"></i>科室信息</el-menu-item>
            <el-menu-item index="2" @click="user"><i class="el-icon-tickets"></i>员工信息</el-menu-item>
            <el-menu-item index="3" @click="bed"><i class="el-icon-goods"></i>床位信息</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="住院管理">
            <el-menu-item index="4" @click="inHospital"><i class="el-icon-edit"></i>住院登记</el-menu-item>
            <el-menu-item index="5" @click="leaveHospital"><i class="el-icon-edit-outline"></i>出院登记</el-menu-item>
            <el-menu-item index="6" @click="balance"><i class="el-icon-sold-out"></i>结算信息</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="查询统计">
            <el-menu-item index="7" @click="statistic"><i class="el-icon-view"></i>住院统计</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="系统设置">
            <el-menu-item index="8" @click="message"><i class="el-icon-view"></i>消息通知</el-menu-item>
          </el-menu-item-group>
        </el-menu>

      </el-col>
    </el-row>


</template>

<script>
    import {delAllItemHistory} from '../../static/js/cache'
    export default {
        data() {
            return {
                sysName:'VUEADMIN',
                collapsed:false,
                sysUserName: '',
                sysUserRole: '',
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        methods: {
            dept:function(){//科室信息
                this.$router.push('/main/dept');
            },
            user:function(){//员工信息
                this.$router.push('/main/user')
            },
            bed:function() {//床位信息
                this.$router.push('/main/bed');
            },
            balance:function() {//结算
                this.$router.push('/main/balance');
            },
            inHospital:function() {//住院登记
                this.$router.push('/main/inHospital');
            },
            leaveHospital:function() {//出院登记
                this.$router.push('/main/leaveHospital');
            },
            message:function() {//出院登记
                this.$router.push('/main/message');
            },
            statistic(){
                this.$router.push('/main/inHospitalStatistic');
            },
            //退出登录
            logout: function () {
                var _this = this;
                this.$confirm('确认退出吗?', '提示', {
                    //type: 'warning'
                }).then(() => {
                    delAllItemHistory();
                    _this.$router.push('/login');
                }).catch(() => {

                });


            },
            //折叠导航栏
            collapse:function(){
                this.collapsed=!this.collapsed;
            },
            showMenu(i,status){
                this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
            }
        },
        mounted() {


        }
    }

</script>

<style>


</style>