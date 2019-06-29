/* Import vue */
import Vue from 'vue';
import FastClick from 'fastclick';

// FastClick.attach(document.body);

/* Import vue-router */
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import axios from 'axios';
Vue.prototype.$axios = axios;

/* Import mint-ui */
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);

import VueQuillEditor from 'vue-quill-editor';

// require styles
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

Vue.use(VueQuillEditor, {
    placeholder: '请输入内容'
});



/* Import bootstrap css */
import './libs/bootstrap/css/bootstrap.css';


import './libs/mui/css/mui.css';
import './libs/mui/css/icons-extra.css';
import './libs/mui/css/mui.picker.css';
import './libs/mui/css/mui.poppicker.css';
import './libs/mui/css/mui.dtpicker.css';


/* Import mui.js */
import mui from './libs/mui/js/mui';
import './libs/mui/js/mui.picker';
import './libs/mui/js/mui.poppicker';
import './libs/mui/js/mui.dtpicker';

/* Init mui so that we can use js in mui */
mui.init();

Vue.prototype.$mui = mui;

/* 解决 tabbar 无法切换路由的问题 */
mui('body').on('tap', 'a', function() { document.location.href = this.href; });


import md5 from 'md5';
Vue.prototype.$md5 = md5;


import * as api from './api/api';
Vue.prototype.$api = api;

import store from './store/store';

// import './static/css/reset.css';
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
    render: function(createElements) {
        return createElements(App);
    },
    router,
    store
})