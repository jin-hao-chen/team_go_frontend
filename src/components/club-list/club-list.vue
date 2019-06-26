<template>
    <div>
        <keep-alive>
            <div id="go-refreshContainer" class="mui-scroll-wrapper">
                <div class="mui-scroll">
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell mui-media" v-for="club in clubList" :key="club.id">
                            <router-link to="team_info" class="router-link-active">
                                <img class="mui-media-object mui-pull-left go-circle" :src="host + club.icon">
                                <div class="mui-media-body">
                                    {{ club.name }}
                                    <p class='mui-ellipsis'>
                                        <span>{{ club.brief }}</span>
                                        <span>{{ club.category }}</span>
                                    </p>
                                </div>
                            </router-link>
                        </li> 
                    </ul>
                </div>
            </div>
        </keep-alive>
    </div>
</template>

<script>

import { Toast } from 'mint-ui';
import mui from '../../libs/mui/js/mui';
import { request } from 'http';
import * as config from '../../api/config';

var options = {
    scrollY: true,
    scrollX: false,
    startX: 0,
    startY: 0,
    indicators: false, // 默认为 true, 改为 false 为了能在安卓上运行
    deceleration:0.0006,
    bounce: false // 默认为 true, 改为 false 为了能在安卓上运行
}

export default {
    name: 'club-list',
    data() {
        return {
            clubList: [],
            host: config.host
        }
    },
    methods: {
        _initPullRefresh() {
            for(var i = mui.hooks.inits.length - 1, item; i >= 0; i--){
                item = mui.hooks.inits[i];
                if(item.name === "pullrefresh"){
                    item.repeat = true;
                }
            }
        },
        pullRefresh() {
            setTimeout(() => {
                mui('#go-refreshContainer').pullRefresh().endPulldownToRefresh();
                this.clubList = this.getClubList();
            }, 1000);
        },
        getClubList() {
            this.$api.get('clubs/', {
                headers: {
                    Token: this.$store.getters.getToken
                }
            })
            .then(response => {
                this.clubList = response.data.clubList;
            })
            .catch(error => {

            });
        }
    },
    created() {
        this._initPullRefresh();
    },
    mounted: function() {
        this.$mui.init({
            pullRefresh: {
                container:"#go-refreshContainer",
                down: {
                    height: 50, //可选,默认50.触发下拉刷新拖动距离,
                    auto: true, //可选,默认false.首次加载自动下拉刷新一次
                    contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                    contentover : "松开立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                    contentrefresh : "正在刷新数据中...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                    callback: this.pullRefresh
                }
            }
        });
        this.$mui('.mui-scroll-wrapper').scroll(options);
    },
    beforeDestroy() {
        mui.options.pullRefresh = null;
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
    text-decoration: none;
}

.mui-table-view {
    margin-bottom: 50px;
    list-style: none;
    
}

/* 解决谷歌浏览器 preventDefault 的报错 */
/* * {
    touch-action: pan-y;
} */

#go-refreshContainer {
    background: #fafafafa;
}

a.router-link-active {
    text-decoration: none;
}

</style>


