import VueRouter from 'vue-router';
import Login from '../components/login/login.vue';
import Home from '../components/home/home.vue';
import TeamList from '../components/team-list/team-list.vue';
import Profile from '../components/profile/profile.vue';
import Notification from '../components/notification/notification.vue';
import TeamInfo from '../components/team-info/team-info.vue';

export default new VueRouter({
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/login', component: Login },
        { path: '/home', redirect: '/home/team_list' },
        {
            path: '/home',
            component: Home,
            children: [{
                path: 'team_list',
                component: TeamList
            }, {
                path: 'profile',
                component: Profile
            }, {
                path: 'notification',
                component: Notification
            }]
        },
        {
            path: '/home/team_info',
            component: TeamInfo
        }
    ],
    linkActiveClass: 'mui-active'
})