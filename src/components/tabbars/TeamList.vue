<template>
    <div>
        <div class="mui-scroll-wrapper">
            <div class="mui-scroll">
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell mui-media" v-for="team in teamList" :key="team.id">
                        <router-link to="/main/team_info">
                            <img class="mui-media-object mui-pull-left go-circle" src="https://avatars1.githubusercontent.com/u/44342030?s=40&v=4">
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
            </div>
        </div>
    </div>
</template>

<script>

import mui from '../../libs/mui/js/mui';

var options = {
    scrollY: true, //是否竖向滚动
    scrollX: false, //是否横向滚动
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
    indicators: true, //是否显示滚动条
    deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
    bounce: true //是否启用回弹
}

export default {
    data: function() {
        return {
            teamList: []
        }
    },
    methods: {
        getTeamList: function() {
            return  [
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
                },{
                    id: 3,
                    name: '绘画',
                    description: '这就是绘画, 这就是绘画, 这就是绘画。',
                    category: '文艺'
                },
                {
                    id: 4,
                    name: '篮球',
                    description: '这就是灌篮, 这就是灌篮, 这就是灌篮。',
                    category: '运动'
                },{
                    id: 5,
                    name: '绘画',
                    description: '这就是绘画, 这就是绘画, 这就是绘画。',
                    category: '文艺'
                },
                {
                    id: 6,
                    name: '篮球',
                    description: '这就是灌篮, 这就是灌篮, 这就是灌篮。',
                    category: '运动'
                },{
                    id: 7,
                    name: '绘画',
                    description: '这就是绘画, 这就是绘画, 这就是绘画。',
                    category: '文艺'
                },
                {
                    id: 8,
                    name: '篮球',
                    description: '这就是灌篮, 这就是灌篮, 这就是灌篮。',
                    category: '运动'
                },{
                    id: 9,
                    name: '绘画',
                    description: '这就是绘画, 这就是绘画, 这就是绘画。',
                    category: '文艺'
                },
                {
                    id: 10,
                    name: '篮球',
                    description: '这就是灌篮, 这就是灌篮, 这就是灌篮。',
                    category: '运动'
                },{
                    id: 11,
                    name: '绘画',
                    description: '这就是绘画, 这就是绘画, 这就是绘画。',
                    category: '文艺'
                },
                {
                    id: 12,
                    name: '篮球',
                    description: '这就是灌篮, 这就是灌篮, 这就是灌篮。',
                    category: '运动'
                },{
                    id: 13,
                    name: '绘画',
                    description: '这就是绘画, 这就是绘画, 这就是绘画。',
                    category: '文艺'
                },
                {
                    id: 14,
                    name: '篮球',
                    description: '这就是灌篮, 这就是灌篮, 这就是灌篮。',
                    category: '运动'
                }
            ]
        }
    },
    created: function() {
        this.teamList = this.getTeamList();
    },
    mounted: function() {
        mui('.mui-scroll-wrapper').scroll(options);
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

.mui-ellipsis {
    display: flex;
    justify-content: space-between;
}

.mui-scroll-wrapper {
    margin-top: 40px;
    height: 580px;
}

.mui-table-view-cell {
    background-color: #ffffff;
}

/* 解决谷歌浏览器 preventDefault 的报错 */
* { 
    touch-action: pan-y; 
} 

</style>


