<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="team in teamList" :key="team.id">
                <a href="javascript:;">
                    <img class="mui-media-object mui-pull-left go-circle" src="https://avatars1.githubusercontent.com/u/44342030?s=40&v=4">
                    <div class="mui-media-body">
                        {{ team.name}}
                        <p class='mui-ellipsis'>简介: {{ team.description }}</p>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            teamList: []
        }
    }, 
    methods: {
        getTeamList: function() {
            this.teamList = [
                {
                    id: 1,
                    name: '创行',
                    description: '我就是我是颜色不一样的烟火天空多么的辽阔可是我'
                },
                {
                    id: 2,
                    name: '书法',
                    description: '我就是我是颜色不一样的烟火天空多么的辽阔可是我'
                }
            ];
        }
    },
    created: function() {
        this.getTeamList();
    },
    mounted: function() {

    }
}
</script>

<style>

.mui-table-view-cell:after {
    /* 去掉默认的列表项之间的间隙 */
    content: none;
}

.go-circle {
    border-radius:50px;
}

</style>


