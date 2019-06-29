import VueRouter from 'vue-router';
import Entry from '../components/entry/entry.vue';
import Login from '../components/login/login.vue';
import Register from '../components/register/register.vue';
import Home from '../components/home/home.vue';
import ClubList from '../components/club-list/club-list.vue';
import Profile from '../components/profile/profile.vue';
import Notification from '../components/notification/notification.vue';
import ClubInfo from '../components/club-info/club-info.vue';
import ClubApplications from '../components/club-info/club-application.vue';
import ClubDescription from '../components/club-description/club-description.vue';
import ClubMembers from '../components/club-members/club-members.vue';
import UserDetail from '../components/user-detail/user-detail.vue';
import UserIntroduction from '../components/user-detail/user-introduction.vue';
import PasswordEdit from '../components/password-edit/password-edit.vue';
import UserClubs from '../components/user-detail/user-clubs.vue';
import CurrentUserApplications from '../components/current-user-applications/current-user-applications.vue';
import CurrentUserClubs from '../components/current-user-clubs/current-user-clubs.vue';
import MobileEdit from '../components/mobile-edit/mobile-edit.vue';
import CurrentUserIntroduction from '../components/current-user-introduction/current-user-introduction.vue';


export default new VueRouter({
    routes: [
        { path: '/', redirect: '/entry' },
        { path: '/entry', redirect: '/entry/login' },
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
                }, {
                    path: 'users/:id',
                    component: UserDetail
                }, {
                    path: 'users/:id/introduction',
                    component: UserIntroduction
                }, {
                    path: 'users/:id/clubs',
                    component: UserClubs
                }
            ]
        },
        { path: '/register/', component: Register },
        { path: '/home/', redirect: '/home/club_list/' },
        {
            path: '/home',
            component: Home,
            children: [{
                path: 'club_list/',
                component: ClubList
            }, {
                path: 'profile/',
                component: Profile,
            }, {
                path: 'profile/clubs/',
                component: CurrentUserClubs
            }, {
                path: 'profile/applications/',
                component: CurrentUserApplications
            }, {
                path: 'profile/introduction/',
                component: CurrentUserIntroduction
            }, {
                path: 'profile/mobile_edit/',
                component: MobileEdit
            }, {
                path: 'profile/password_edit/',
                component: PasswordEdit
            }, {
                path: 'notification/',
                component: Notification
            }, {
                path: 'club_info/:id/',
                component: ClubInfo,
            }, {
                path: 'club_info/:id/description/',
                component: ClubDescription
            }, {
                path: 'club_info/:id/members/',
                component: ClubMembers
            }, {
                path: 'club_info/:id/applications',
                component: ClubApplications
            }]
        },
    ],
    linkActiveClass: 'mui-active remove-underline'
})