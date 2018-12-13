import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import axios from 'axios'
//自动的引入store目录下的index.js
import store from './store'

Vue.use(ElementUI);
//将axios改写成Vue的原型属性
Vue.prototype.$ajax = axios;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
