<template>
    <div id="go-refreshContainer-user" class="mui-scroll-wrapper">
        <div class="mui-scroll">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell mui-media" v-for="club in clubList" :key="club.id">
                    <router-link :to="'/home/club_info/' + club.id" class="router-link-active">
                        <img class="mui-media-object mui-pull-left go-circle" :src="host + club.icon">
                        <div class="mui-media-body">
                            {{ club.name }}
                            <p class='mui-ellipsis'>
                                <span>{{ club.brief }}</span>
                                <span>{{ club.category }}</span>
                            </p>
                        </div>
                        <span v-if="isManage(club.id)" class="mui-badge mui-badge-danger">{{ club.persons }}</span>
                        <span v-else-if="isJoined(club.id)" class="mui-badge mui-badge-success">{{ club.persons }}</span>
                        <span v-else class="mui-badge">{{ club.persons }}</span>
                    </router-link>
                </li> 
            </ul>
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

export default {
    data() {
        return {
            userId: '',
            clubList: [],
            manageClubsIds: [],
            joinedClubsIds: [],
            host: config.host
        }
    },
    created() {
        this._initPullRefresh();
        this.userId = this.$route.params.id;
        this.$store.commit('setTitle', '他的社团');
        this.getClubList();
        this.getManageClubsIds();
        this.getJoinedClubsIds();
        this.$store.commit('setIsShowTabbar', true);
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
                mui('#go-refreshContainer-user').pullRefresh().endPulldownToRefresh();
                this.getClubList();
                this.getManageClubsIds();
                this.getJoinedClubsIds();
            }, 2000);
        },
        getClubList() {
            this.$api.get('clubs/?userId=' + this.userId, {
                headers: {
                    Token: this.$store.getters.getToken
                }
            })
            .then(response => {
                this.clubList = response.data.clubList;
            })
            .catch(error => {
                Toast({
                    message: '网络连接异常',
                    duration: 500
                });
            });
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
            this.$api.get('clubs/?userId=' + this.userId, {
                headers: {
                    Token: this.$store.getters.getToken
                }
            })
            .then(response => {
                var joinedClubs = response.data.clubList;
                for (var i = 0; i < joinedClubs.length; ++i) {
                    this.joinedClubsIds.push(joinedClubs[i].id);
                }
            })
            .catch(error => {
                Toast({
                    message: '网络连接异常',
                    duration: 500
                });
            });
        },
        getManageClubsIds() {
            this.$api.get('user_club/?userId=' + this.userId, {
                headers: {
                    Token: this.$store.getters.getToken
                }
            })
            .then(response => {
                var user_club = response.data.user_club;
                for (var i = 0; i < user_club.length; ++i) {
                    this.manageClubsIds.push(user_club[i].club);
                }
            })
            .catch(error => {
                Toast({
                    message: '网络连接异常',
                    duration: 500
                });
            });
        },
    },
}
</script>

<style scoped>
    
.mui-table-view-cell:after {
    /* 去掉默认的列表项之间的间隙 */
    content: none;
}

.mui-table-view::after,
.mui-table-view::before {
    height: 0;
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
