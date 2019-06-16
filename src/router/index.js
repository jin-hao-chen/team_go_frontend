import VueRouter from 'vue-router';
import TeamList from '../components/tabbars/TeamList.vue';
import Profile from '../components/tabbars/Profile.vue';

export default new VueRouter({
    routes: [
        { path: '/', redirect: '/team_list' },
        { path: '/team_list', component: TeamList },
        { path: '/profile', component: Profile }
    ]
})