import '@/less/index.less'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as ReqExample from './request/example'

Vue.prototype.$ReqExample = ReqExample

Vue.config.productionTip = false

// 向上通知
Vue.prototype['dispatch'] = function (event, payload) {
  let parent = this.$parent;
  while (parent) {
    parent.$emit(event, payload);
    parent = parent.$parent;
  }
};
// 向下广播
Vue.prototype['broadcast'] = function (event, payload) {
  const broadcast = children => {
    children.forEach(child => {
      child.$emit(event, payload);
      if (child.$children) {
        broadcast(child.$children);
      }
    });
  };
  broadcast(this.$children);
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
