/**
 * Created by Administrator on 2017/9/30.
 */
//导入组件
//导入Vue对象和路由对象
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import Login from '../components/login/login.vue'
import Main from '../components/menu/main.vue'
import Index from '../components/index/index.vue'
import Bed from '../components/bed/bed.vue'
import Dept from '../components/dept/dept.vue'
import User from '../components/user/user.vue'
import Message from '../components/message/message.vue'
import InHospital from '../components/in-hospital/in-hospital.vue'
import LeaveHospital from '../components/leave-hospital/leave-hospital.vue'
import Balance from '../components/balance/balance'
import BedAdd from '../components/bed/bed-add'
import DeptAdd from '../components/dept/dept-add'
import UserAdd from '../components/user/user-add'
import InHospitalAdd from '../components/in-hospital/in-hospital-add'
import LeaveHospitalAdd from '../components/leave-hospital/leave-hospital-add'
import MessageAdd from '../components/message/message-add'
import BalanceDetail from '../components/balance/balance-detail'
import InHospitalStatistic from '../components/statistic/inhospital-statistic'
import {delAllItemHistory,loadUser} from '../static/js/cache'


Vue.use(Router)
const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'   //重定向
        },
        {
            path: '/login',
            component: Login
        },
        {path:'/main',component:Main,
            meta:{requireAuth:true},
            children:[
                {path:'/',component:Index},
                {path:'bed',component:Bed},
                {path:'dept',component:Dept},
                {path:'user',component:User},
                {path:'message',component:Message},
                {path:'inHospital',component:InHospital},
                {path:'leaveHospital',component:LeaveHospital},
                {path:'balance',component:Balance},
                {path:'inHospitalStatistic',component:InHospitalStatistic},
                {path:'bedAdd',component:BedAdd},
                {path:'deptAdd',component:DeptAdd},
                {path:'userAdd',component:UserAdd},
                {path:'messageAdd',component:MessageAdd},
                {path:'inHospitalAdd',component:InHospitalAdd},
                {path:'leaveHospitalAdd',component:LeaveHospitalAdd},
                {path:'balanceDetail',component:BalanceDetail}

            ]
        },

    ]


})

/*// 全局路由守卫
router.beforeEach((to, from, next) => {
    console.log('navigation-guards');
    // to: Route: 即将要进入的目标 路由对象
    // from: Route: 当前导航正要离开的路由
    // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

    const nextRoute = ['main'];
    let isLogin = true;  // 是否登录
    // 未登录状态；当路由到nextRoute指定页时，跳转至login
    console.log(to)
    console.log(to.path.indexOf(nextRoute) )

    if (to.path.indexOf(nextRoute) >= 0) {
        if (!isLogin) {
            console.log('what fuck');
            router.push('/login');
        }
    }
    // 已登录状态；当路由到login时，跳转至home
    if (to.path.indexOf('login') !== -1) {
        if (isLogin) {
            router.push('/main');
        }
    }
    next();
});*/


//路由跳转前判断是否已登录
router.beforeEach((to, from, next) => {
    const isLogin = store.getters.getIsLogin; // 是否登录
    console.log(isLogin)
    if (to.path === '/login') {
        delAllItemHistory()
    }

    if (to.path.indexOf('main') === -1) { //如果访问的不是后台管理则可以访问
        next();
    } else {
        //let user = loadUser();
        //console.log(user.staffName)
        //if (user.staffName === undefined && to.path !== '/login') {
        if(!isLogin){
            console.log('没有登录')
            next({path: '/login'})
        } else {
            next()
        }
    }
})

export default router
