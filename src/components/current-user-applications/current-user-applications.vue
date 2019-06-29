<template>
    <div id="go-refreshContainer-user" class="mui-scroll-wrapper">
        <div class="mui-scroll">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell mui-media" v-for="club in applicationClubList" :key="club.id">
                    <router-link :to="'/home/club_info/' + club.id" class="router-link-active">
                        <img class="mui-media-object mui-pull-left go-circle" :src="host + club.icon">
                        <div class="mui-media-body">
                            {{ club.name }}
                            <p class='mui-ellipsis'>
                                <span>{{ club.brief }}</span>
                                <span>{{ club.category }}</span>
                            </p>
                        </div>
                        <span class="mui-badge">{{ club.persons }}</span>
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
            applicationClubList: [],
            host: config.host
        }
    },
    created() {
        this._initPullRefresh();
        this.userId = this.$store.getters.getUserId;
        this.$store.commit('setTitle', '申请的社团');
        this.getApplicationClubList();
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
            }, 1000);
        },
        getApplicationClubList() {
            var toast = Toast({
                message: '加载中...',
                duration: -1
            })
            this.$api.get('applications/?userId=' + this.userId, {
                headers: {
                    Token: this.$store.getters.getToken
                }
            })
            .then(response => {
                toast.close();
                if (response.data.status === config.STATUS_SUCCESS) {
                    this.applicationClubList = response.data.applicationClubs;
                } else if (response.data.status === config.STATUS_ERROR) {
                    Toast({
                        message: response.data.msg,
                        duration: 1000
                    });
                }
            })
            .catch(error => {
                Toast({
                    message: '网络连接异常',
                    duration: 500
                });
            });
        },
    }
}
</script>

<style scoped>
    
</style>
