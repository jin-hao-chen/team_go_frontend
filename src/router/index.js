import VueRouter from 'vue-router';
import Entry from '../components/entry/entry.vue';
import Login from '../components/login/login.vue';
import Register from '../components/register/register.vue';
import Home from '../components/home/home.vue';
import ClubList from '../components/club-list/club-list.vue';
import Profile from '../components/profile/profile.vue';
import Notification from '../components/notification/notification.vue';
import ClubInfo from '../components/club-info/club-info.vue';

export default new VueRouter({
    routes: [
        { path: '/', redirect: '/entry' },
        // { path: '/entry', redirect: '/entry/login' },
        {
            path: '/entry',
            component: Entry,
            children: [{
                    path: 'login',
                    component: Login
                },
                {
                    path: 'register',
                    component: Register
                }
            ]
        },
        { path: '/register', component: Register },
        { path: '/home', redirect: '/home/club_list' },
        {
            path: '/home',
            component: Home,
            children: [{
                path: 'club_list',
                component: ClubList
            }, {
                path: 'profile',
                component: Profile
            }, {
                path: 'notification',
                component: Notification
            }]
        },
        {
            path: '/home/club_info',
            component: ClubInfo
        }
    ],
    linkActiveClass: 'mui-active remove-underline'
})