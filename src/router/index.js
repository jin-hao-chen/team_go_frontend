import VueRouter from 'vue-router';
import Login from '../components/views/Login.vue';
import Main from '../components/views/Main.vue';
import TeamList from '../components/tabbars/TeamList.vue';
import Profile from '../components/tabbars/Profile.vue';

export default new VueRouter({
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login },
        { path: '/main', redirect: '/main/team_list' },
        {
            path: '/main',
            component: Main,
            children: [{
                path: '/main/team_list',
                component: TeamList
            }, {
                path: '/main/profile',
                component: Profile
            }]
        }
    ],
    linkActiveClass: 'mui-active'
})