/* Import vue */
import Vue from 'vue';


/* Import vue-router */
import VueRouter from 'vue-router';
Vue.use(VueRouter);

/* Import mint-ui */
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);



/* Import bootstrap css */
import './libs/bootstrap/css/bootstrap.min.css';

import './libs/mui/css/mui.min.css';
import './libs/mui/css/icons-extra.css';

/* Import mui.js */
import mui from './libs/mui/js/mui';

/* Init mui so that we can use js in mui */
mui.init();

/* 解决 tabbar 无法切换路由的问题 */
mui('body').on('tap', 'a', function() { document.location.href = this.href; });



/* Import my router */
import router from './router/index';

/* Import my app component */
import App from './App.vue';

/* Import my css */
import './static/css/index.css';

/* Create vue instance */
var app = new Vue({
    el: "#app",
    data: {

    },
    methods: {

    },
    render: function(createElements) {
        return createElements(App);
    },
    router: router
});