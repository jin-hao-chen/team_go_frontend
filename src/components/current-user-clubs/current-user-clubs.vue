<template>
    <div>
         <div id="go-refreshContainer" class="mui-scroll-wrapper go-mui-scroll-wrapper-space">
            <div class="mui-scroll">
                <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a href="javascript:;" class="mui-control-item mui-active" @tap="changeScope">
                        全部
                    </a>
                    <a href="javascript:;" class="mui-control-item" @tap="changeScope">
                        学术
                    </a>
                    <a href="javascript:;" class="mui-control-item" @tap="changeScope">
                        学艺
                    </a>
                    <a href="javascript:;" class="mui-control-item" @tap="changeScope">
                        体育
                    </a>
                    <a href="javascript:;" class="mui-control-item" @tap="changeScope">
                        服务
                    </a>
                    <a href="javascript:;" class="mui-control-item" @tap="changeScope">
                        康乐
                    </a>
                    <a href="javascript:;" class="mui-control-item" @tap="changeScope">
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

export default {
    data() {
        return {
            userId: '',
            clubList: [],
            currentType: '全部',
            manageClubsIds: [],
            joinedClubsIds: [],
            host: config.host
        }
    },
    created() {
        this._initPullRefresh();
        this.userId = this.$store.getters.getUserId;
        this.clubList = this.$store.getters.getOwnedClubList;
        this.getManageClubsIds();
        this.getJoinedClubsIds();
        this.$store.commit('setTitle', '加入的社团');
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
            setTimeout(() => {
                mui('#go-refreshContainer').pullRefresh().endPulldownToRefresh();
            }, 2000);
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

.go-mui-scroll-wrapper-space {
    margin-top: 1%;
}


#go-refreshContainer {
    background: #fafafafa;
}

a.router-link-active {
    text-decoration: none;
}
    
</style>
