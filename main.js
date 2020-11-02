import Vue from 'vue';
import App from './App';

// 引入 封装的请求库并挂载在 Vue 原型上，使用的时候：this.$H
import $H from './common/request.js';
Vue.prototype.$H = $H;

// 引入 Vuex 并挂载在 Vue 原型上
import store from './store/index.js';
Vue.prototype.$store = store;

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
	store,
	...App
});
app.$mount();
