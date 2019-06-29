<template>
    <div>
        <div id="go-refreshContainer-application" class="mui-scroll-wrapper">
            <div class="mui-scroll">
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell mui-media " v-for="application in applicationList" :key="application.id">
                        <div class="mui-slider-right mui-disabled">
						    <a href="javascript:;" class="mui-btn mui-btn-yellow" @click="accept(application.id)">接受</a>
                            <a href="javascript:;" class="mui-btn mui-btn-red" @click="reject(aapplication.id)">拒绝</a>
					    </div>
                        <div class="mui-slider-handle">
                            <router-link :to="'/entry/users/' + application.id" class="router-link-active">
                                <img class="mui-media-object mui-pull-left go-circle" :src="host + application.icon">
                                <div class="mui-media-body">
                                    {{ application.username }}
                                    <p class='mui-ellipsis'>
                                        <span>{{ application.nickname }}</span>
                                        <span>{{ application.department }}</span>
                                    </p>
                                </div>
                            </router-link>
                        </div>
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
    data() {
        return {
            clubId: '',
            applicationList: [],
            host: config.host
        }
    },
    created() {
        this.clubId = this.$route.params.id;
        this.getApplicationList()
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
        reject() {
            var toast = Toast({
                message: '加载中...',
                duration: -1
            })
            this.$axios.delete('applications/', {
                data: {
                    clubId: this.clubId,
                    applicationId: applicationId,
                    accept: false
                },
                headers: {
                    token: this.$store.getters.getToken
                }
            })
            .then(response => {
                toast.close();
                if (response.data.status === config.STATUS_ERROR) {
                    Toast({
                        message: response.data.msg,
                        duration: 1000
                    });
                } else if (response.data.status === config.STATUS_SUCCESS) {
                    Toast({
                        message: '操作成功',
                        duration: 1000
                    })
                }
            })
            .catch(error => {
                toast.close();
                Toast({
                    message: '网络连接异常',
                    duration: 500
                });
            })
        },
        accept(applicationId) {
            var toast = Toast({
                message: '加载中...',
                duration: -1
            });
            this.$axios.delete('applications/', {
                data: {
                    clubId: this.clubId,
                    applicationId: applicationId,
                    accept: true
                },
                headers: {
                    token: this.$store.getters.getToken
                }
            })
            .then(response => {
                toast.close();
                if (response.data.status === config.STATUS_ERROR) {
                    Toast({
                        message: response.data.msg,
                        duration: 1000
                    });
                } else if (response.data.status === config.STATUS_SUCCESS) {
                    Toast({
                        message: '操作成功',
                        duration: 1000
                    })
                }
            })
            .catch(error => {
                toast.close();
                Toast({
                    message: '网络连接异常',
                    duration: 500
                });
            })
        },
        pullRefresh() {
            setTimeout(() => {
                mui('#go-refreshContainer-mem').pullRefresh().endPulldownToRefresh();
                this.getApplicationList();
            }, 2000);
        },
        getApplicationList() {
            var toast = Toast({
                message: '加载中...',
                duration: -1
            })
            this.$api.get('applications/?clubId=' + this.clubId, {
                headers: {
                    token: this.$store.getters.getToken
                }
            })
            .then(response => {
                toast.close();
                if (response.data.status === config.STATUS_SUCCESS) {
                    this.applicationList = response.data.applications;
                    if (this.applicationList.length === 0) {
                        Toast({
                            message: '一个人都没有...',
                            duration: 1000
                        });
                    }
                } else if (response.data.status === config.STATUS_ERROR) {
                    Toast({
                        message: '未知错误',
                        duration: 1000
                    });
                }
            })
            .catch(error => {
                toast.close();
                Toast({
                    message: '网络连接异常',
                    duration: 500
                });
            })
        }
     }
}
</script>


<style scoped>
    
</style>
