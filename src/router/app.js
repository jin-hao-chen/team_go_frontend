import VueRouter from 'vue-router';
import Login from '../components/views/Login.vue';
import Main from '../components/views/Main.vue';

export default new VueRouter({
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login },
        { path: '/main', component: Main }
    ]
})