/* Import vue */
import Vue from 'vue';

/* Import vue-router */
import VueRouter from 'vue-router';
Vue.use(VueRouter);

/* Import mint-ui */
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
// import './static/css/my-mint.scss';
Vue.use(MintUI);

/* Import bootstrap css */
import './libs/bootstrap/css/bootstrap.min.css';

import './libs/mui/css/mui.min.css';
import './libs/mui/css/icons-extra.css';

/* Import my css */
import './static/css/index.css';

/* Import my router */
import router from './router/index';

/* Import my app component */
import App from './App.vue';

/* Create vue instance */
var app = new Vue({
    el: "#app",
    data: {

    },
    methods: {

    },
    render: (createElements) => createElements(App),
    router: router
});