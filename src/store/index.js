/**
 * Created by Administrator on 2017/6/28.
 */
import Vue from 'vue'
//vuex是vue第三方插件 周边生态 数据流
//将Vuex的逻辑全部在index.js中实现
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import * as getters from './getters'
Vue.use(Vuex);

//状态集合,全局管理的引起界面状态改变的值
const state = {
  user: {},
  isLogin:false,  //是否登录
}

//创建一个Vuex的Store实例
export default new Vuex.Store({
  state, //状态
  mutations,//改变
  getters,
  actions   //动作,组件不能直接改变state
})
