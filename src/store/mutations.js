/**
 * Created by Administrator on 2017/6/28.
 */
//导入常量定义
import * as types from './mutations-type'
import axios from 'axios'
import {host} from '../static/js/common'

export default{
  //登录
  [types.LOGIN](state,data){
    axios.post(`${host}/staff/get`,data).then(res=>{
        state.isLogin = true;
    })
  },

  //设置是否登录
  [types.SET_ISLOGIN](state,flag){
    state.isLogin = flag
  },

  //设置用户
  [types.SET_USER](state,data){
    state.user = data
  }

}
