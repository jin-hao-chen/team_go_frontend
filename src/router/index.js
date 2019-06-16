import VueRouter from 'vue-router';
import TeamList from '../components/tabbars/TeamList.vue';
import Profile from '../components/tabbars/Profile.vue';
import '../libs/mui/js/mui';

export default new VueRouter({
    routes: [
        { path: '/main/team_list', component: TeamList },
        { path: '/main/profile', component: Profile }
    ],
    linkActiveClass: 'mui-active'
})