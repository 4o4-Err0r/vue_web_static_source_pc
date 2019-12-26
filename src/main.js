import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueParticles from 'vue-particles' 
import i18n from './i18n'
import elTableInfiniteScroll from 'el-table-infinite-scroll';
Vue.use(elTableInfiniteScroll);
import VueScroller from "vue-scroller"
Vue.use(VueScroller);
import { InfiniteScroll } from 'mint-ui';

Vue.use(InfiniteScroll);
import JRPCWS from 'vue-json-rpc-websocket'


import "./assets/css/common.css"
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
require('echarts/lib/chart/pie');
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');

import VueCookies from 'vue-cookies';
Vue.use (VueCookies)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$echarts=echarts;
Vue.use(ElementUI)
Vue.use(VueParticles)
Vue.config.productionTip = false

Vue.use(JRPCWS, 'wss://'+window.location.host+'/http_proxy/api/ws-jsonrpc/v1', {
  reconnectEnabled: true,
  reconnectInterval: 3000,
  recconectAttempts: 9999,
  store:store
})

export function $i18n(path) {
  let locale = i18n.locale;
  let messages = i18n.messages;
  let lang = messages[locale];
  let getText = (path) => {
      const array = path.split('.');
      let current = lang;
      let value = ''
      for (let i = 0, j = array.length; i < j; i++) {
          current = current[array[i]]
          if(!current){
            break;  
          }
          if(i === j - 1){
              value = current;
          }
      }
      return value || path;
  }
  return getText(path)
}

window.main=new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');


import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
return routerPush.call(this, location).catch(error=> error)
}
