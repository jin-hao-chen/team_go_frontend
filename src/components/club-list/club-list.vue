<template>
    <div>
        <div id="go-refreshContainer" class="mui-scroll-wrapper go-mui-scroll-wrapper-space">
            <div class="mui-scroll">
                <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a href="javascript:;" class="mui-control-item mui-active" @click="changeScope">
                        全部
                    </a>
                    <a href="javascript:;" class="mui-control-item" @click="changeScope">
                        学术
                    </a>
                    <a href="javascript:;" class="mui-control-item" @click="changeScope">
                        学艺
                    </a>
                    <a href="javascript:;" class="mui-control-item" @click="changeScope">
                        体育
                    </a>
                    <a href="javascript:;" class="mui-control-item" @click="changeScope">
                        服务
                    </a>
                    <a href="javascript:;" class="mui-control-item" @click="changeScope">
                        康乐
                    </a>
                    <a href="javascript:;" class="mui-control-item" @click="changeScope">
                        综合
                    </a>
                    <a href="javascript:;" class="mui-control-item" @click="changeScope">
                        资质
                    </a>
                </div>
            </div>
                <ul class="mui-table-view">
                    <div  v-for="club in clubList" :key="club.id">
                        <li class="mui-table-view-cell mui-media" v-if="filterType(club.type)">
                            <router-link :to="'/home/club_info/' + club.id" class="router-link-active">
                                <img class="mui-media-object mui-pull-left go-circle" :src="host + club.icon">
                                <div class="mui-media-body">
                                    {{ club.name }}
                                    <span class="mui-badge mui-badge-danger">{{ club.type }}</span>
                                    <span class="mui-badge mui-badge-purple">{{ club.level }}</span>
                                    <p class='mui-ellipsis'>
                                        <span>{{ club.brief }}</span>
                                    </p>
                                </div>
                                <span v-if="isManage(club.id)" class="mui-badge mui-badge-danger">{{ club.persons }}</span>
                                <span v-else-if="isJoined(club.id)" class="mui-badge mui-badge-success">{{ club.persons }}</span>
                                <span v-else class="mui-badge">{{ club.persons }}</span>
                            </router-link>
                        </li>
                    </div> 
                </ul>
            </div>
        </div>
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

const normalClass = 'mui-badge-primary';
const adminClass = 'mui-badge-danger';
const joinedClass = 'mui-badge-success';

export default {
    name: 'club-list',
    data() {
        return {
            userId: '',
            currentType: '全部',
            clubList: [],
            manageClubsIds: [],
            joinedClubsIds: [],
            host: config.host
        }
    },
    methods: {
        changeScope(e) {
            var value = e.target.innerText;
            this.currentType = value;
        },
        _initPullRefresh() {
            for(var i = mui.hooks.inits.length - 1, item; i >= 0; i--){
                item = mui.hooks.inits[i];
                if(item.name === "pullrefresh"){
                    item.repeat = true;
                }
            }
        },
        filterType(type) {
            if (this.currentType == '全部') {
                return true;
            }
            if (this.currentType === type) {
                return true;
            }
            return false;
        },
        pullRefresh() {
            // setTimeout(() => {
                mui('#go-refreshContainer').pullRefresh().endPulldownToRefresh();
                this.initApp();
            // }, 2000);
        },
        isManage(clubId) {
            for (var i = 0; i < this.manageClubsIds.length; ++i) {
                if (clubId === this.manageClubsIds[i]) {
                    return true;
                }
            }
            return false;
        },
        isJoined(clubId) {
            for (var i = 0; i < this.joinedClubsIds.length; ++i) {
                if (clubId === this.joinedClubsIds[i]) {
                    return true;
                }
            }
            return false;
        },
        getJoinedClubsIds() {
            var toast = Toast({
                message: '加载中...',
                duration: -1
            });
            this.$api.get('clubs/?userId=' + this.userId, {
                headers: {
                    Token: this.$store.getters.getToken
                }
            })
            .then(response => {
                toast.close();
                var joinedClubs = response.data.clubList;
                for (var i = 0; i < joinedClubs.length; ++i) {
                    this.joinedClubsIds.push(joinedClubs[i].id);
                }
            })
            .catch(error => {
                toast.close();
                Toast({
                    message: '网络连接异常',
                    duration: 500
                });
            });
        },
        getManageClubsIds() {
            var toast = Toast({
                message: '加载中...',
                duration: -1
            });
            this.$api.get('user_club/?userId=' + this.userId, {
                headers: {
                    Token: this.$store.getters.getToken
                }
            })
            .then(response => {
                toast.close();
                var user_club = response.data.user_club;
                for (var i = 0; i < user_club.length; ++i) {
                    this.manageClubsIds.push(user_club[i].club);
                }
            })
            .catch(error => {
                toast.close();
                Toast({
                    message: '网络连接异常',
                    duration: 500
                });
            });
        },
        getClubList() {
            var toast = Toast({
                message: '加载中...',
                duration: -1
            });
            this.$api.get('clubs/', {
                headers: {
                    Token: this.$store.getters.getToken
                }
            })
            .then(response => {
                toast.close();
                this.clubList = response.data.clubList;
            })
            .catch(error => {
                toast.close();
                Toast({
                    message: '网络连接异常',
                    duration: 500
                });
            });
        },
        initApp() {
            this.getClubList();
            this.getManageClubsIds();
            this.getJoinedClubsIds();
            this.$store.commit('setTitle', '社团列表');
            this.$store.commit('setIsShowTabbar', true);
        }
    },
    created() {
        this._initPullRefresh();
        this.userId = this.$store.getters.getUserId;
        this.currentType = '全部';
        this.initApp();
    },
    mounted: function() {
        this.$mui.init({
            pullRefresh: {
                container:"#go-refreshContainer",
                down: {
                    height: 50, //可选,默认50.触发下拉刷新拖动距离,
                    auto: false, //可选,默认false.首次加载自动下拉刷新一次
                    contentdown : "",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                    contentover : "",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                    contentrefresh : "",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
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

.go-mui-scroll-wrapper-space {
    margin-top: 1%;
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


