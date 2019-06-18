<template>
    <div>
        <div id="go-refreshContainer" class="mui-scroll-wrapper">
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

import { Toast } from 'mint-ui';
import mui from '../../libs/mui/js/mui';


var options = {
    scrollY: true,
    scrollX: false,
    startX: 0,
    startY: 0,
    indicators: true,
    deceleration:0.0006,
    bounce: true
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
        },
        pullRefresh: function() {
            setTimeout(function() {
                mui('#go-refreshContainer').pullRefresh().endPulldownToRefresh();
            }, 1000);
        }
    },
    created: function() {
        this.teamList = this.getTeamList();
    },
    mounted: function() {
        mui.init({
            pullRefresh : {
                container:"#go-refreshContainer",
                down : {
                  height: 50, //可选,默认50.触发下拉刷新拖动距离,
                  auto: true, //可选,默认false.首次加载自动下拉刷新一次
                  contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                  contentover : "松开立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                  contentrefresh : "正在刷新数据中...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                  callback: this.pullRefresh
                }
              }
            });
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
}

.mui-table-view-cell {
    background-color: #ffffff;
}

.mui-table-view {
    margin-bottom: 50px;
}

/* 解决谷歌浏览器 preventDefault 的报错 */
* {
    touch-action: pan-y;
}

#go-refreshContainer {
    background: #fafafafa;
}

</style>


