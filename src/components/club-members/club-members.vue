<template>
    <div>
        <div id="go-refreshContainer-mem" class="mui-scroll-wrapper">
            <div class="mui-scroll">
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell mui-media" v-for="mem in members" :key="mem.id">
                        <router-link :to="'/entry/users/' + mem.id" class="router-link-active">
                            <img class="mui-media-object mui-pull-left go-circle" :src="host + mem.icon">
                            <div class="mui-media-body">
                                {{ mem.username }}
                                <p class='mui-ellipsis'>
                                    <span>{{ mem.nickname }}</span>
                                    <span>{{ mem.instituteName }}</span>
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
     name: 'club-members',
     data() {
         return {
             clubId: '',
             members: [],
             host: config.host,
             instituteName: ''
         }
     },
     created() {
        this.clubId = this.$route.params.id;
        this._initPullRefresh();
        this.getMembers();
        this.$store.commit('setTitle', '成员列表');
        this.$store.commit('setIsShowTabbar', true);
     },
     methods: {
        _initPullRefresh() {
            for(var i = mui.hooks.inits.length - 1, item; i >= 0; i--){
                item = mui.hooks.inits[i];
                if (item.name === "pullrefresh") {
                    item.repeat = true;
                }
            }
        },
        pullRefresh() {
            setTimeout(() => {
                mui('#go-refreshContainer-mem').pullRefresh().endPulldownToRefresh();
                this.getMembers();
            }, 2000);
        },
        getMembers() {
            var getMemsToast = Toast({
                message: '加载中...',
                duration: -1
            });
            this.$api.get('users/', {
                headers: {
                    Token: this.$store.getters.getToken
                },
                params: {
                    clubId: this.clubId
                }
            })
            .then(response => {
                getMemsToast.close();
                if (response.data.status === config.STATUS_SUCCESS) {
                    this.members = response.data.users;
                    if (this.members.length === 0) {
                        Toast({
                            message: '该社团一个人都没有',
                            duration: 1000
                        })
                    }
                } else if (response.data.status === config.STATUS_ERROR) {
                    Toast({
                        message: response.msg,
                        duration: 1000
                    });
                    this.$router.push('/entry/login/');
                }
                
            })
            .catch(error => {
                getMemsToast.close();
                Toast({
                    message: '网络连接异常',
                    duration: 500
                });
            });
        }
     }
}
</script>

<style scoped>


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

a.router-link-active {
    text-decoration: none;
}

</style>

