/**
 * Created by Administrator on 2017/11/14.
 */
import storage from 'good-storage'

const USER_KEY = '__user'

export function saveUser(obj){
  //把最新的查询历史保存到storage中
  storage.set(USER_KEY,obj)
}

//从本地storage获取搜索历史
export function loadUser(){
  return storage.get(USER_KEY,{})
}

//从本地storage删除所有搜索项
export function delAllItemHistory(){
    storage.set(USER_KEY,{})
    return {}
}

