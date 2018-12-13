/**
 * Created by Administrator on 2017/6/28.
 */
import * as types from './mutations-type'

export default {

  //登录
  login({commit},data){
        commit(types.LOGIN,data)
  },

  //设置是否登录
  setIsLogin({commit},flag){
    commit(types.SET_ISLOGIN,flag)
  },

  //设置用户
  setUser({commit},data){
    commit(types.SET_USER,data)
  }
}
