// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import fastclick from 'fastclick';
import vhomed from './common/vhomed.js';
import axios from 'axios';

Vue.use(vhomed);
Vue.config.productionTip = false;
// 消除手机端点击300ms延迟
fastclick.attach(document.body);
Vue.prototype.$ajax = axios;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
});
