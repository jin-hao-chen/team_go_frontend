<template>
    <div class="container">
        <go-header></go-header>
        <ul class="mui-table-view" v-for="team in teamList" :key="team.id">
            <li class="mui-table-view-cell mui-media" >
                <router-link to="/main/team_info/">
                    <img class="mui-media-object mui-pull-left" src="https://avatars1.githubusercontent.com/u/44342030?s=40&v=4">
                    <div class="mui-media-body">
                        {{ team.name }}
                        <p class='mui-ellipsis'>
                            <span>{{ team.description }}</span>
                            <span>{{ team.category }}</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
        <go-tabbar></go-tabbar>
    </div>
</template>

<script>

import Header from '../common/Header.vue';
import Tabbar from '../common/Tabbar.vue';
import router from '../../router/index';

export default {
    data: function() {
        return {
            teamList: []
        }
    },
    methods: {
        getTeamList: function() {
            this.teamList = [
                {
                    id: 1,
                    name: '绘画',
                    description: '这就是绘画, 这就是绘画, 这就是绘画。',
                    category: '文艺'
                },
                {
                    id: 2,
                    name: '篮球',
                    description: '这就是灌篮, 这就是灌篮, 这就是灌篮。',
                    category: '运动'
                }
            ]
        }
    },
    created: function() {
        this.getTeamList();
    },
    mounted: function() {

    },
    components: {
        'go-header': Header,
        'go-tabbar': Tabbar
    },
    router: router
}

</script>

<style scoped>


.container {
    padding: 0;
    padding-top: 40px;
}

.mui-ellipsis {
    display: flex;
    justify-content: space-between;
}

</style>
