import Vue from 'vue';
import Router from 'vue-router';
import calendarpage from '../components/page/calendarpage.vue';
import index from '../components/page/index.vue';
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: index
        },
        {
            path: '/calendarpage',
            component: calendarpage
        }
    ]
});
