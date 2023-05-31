import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './rem'
import VueLuckyCanvas from '@lucky-canvas/vue'
import getParm from "./utils/GetParm";
import createTime from "./utils/createTime";
import axios from 'axios'
import qs from 'qs'
// import  "@/api/api";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCookie from 'vue-cookie'
import VueWechatTitle from 'vue-wechat-title';

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.use(VueWechatTitle);
Vue.use(ElementUI);
Vue.use(VueCookie);
Vue.use(VueLuckyCanvas)
Vue.prototype.getParm = getParm;
Vue.prototype.createTime = createTime;
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
