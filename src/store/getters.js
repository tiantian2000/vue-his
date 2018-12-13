/**
 * Created by Administrator on 2017/6/29.
 */
//从 store 中的 state 中派生出一些状态
//取是否登录
export const getIsLogin = state=>state.isLogin
//取用户
export const getUser = state=>state.user

