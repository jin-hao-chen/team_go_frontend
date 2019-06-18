import VueRouter from 'vue-router';
import Login from '../components/views/Login.vue';
import Main from '../components/views/Main.vue';
import TeamList from '../components/team/TeamList.vue';
import Profile from '../components/profile/Profile.vue';

export default new VueRouter({
    routes: [
        { path: '/', redirect: '/main' },
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