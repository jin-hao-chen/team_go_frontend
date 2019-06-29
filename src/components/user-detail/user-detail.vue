<template>
    <div>
        <ul class="mui-table-view go-table-view-no-last-line">
            <li class="mui-table-view-cell go-table-view-cell-flex">
                <span>学号</span>
                <span>{{ username }}</span>
            </li>

            <li class="mui-table-view-cell go-table-view-cell-flex">
                <span>姓名</span>
                <span>{{ nickname }}</span>
            </li>

            <li class="mui-table-view-cell go-table-view-cell-flex">
                <span>手机号</span>
                <span>{{ mobile }}</span>
            </li>

            <li class="mui-table-view-cell go-table-view-cell-flex">
                <span>入学时间</span>
                <span>{{ admission_time }}</span>
            </li>

            <li class="mui-table-view-cell go-table-view-cell-flex">
                <span>学院</span>
                <span>{{ institute }}</span>
            </li>

            <li class="mui-table-view-cell">
                <router-link :to="'/entry/users/' + this.userId + '/introduction/'" class="mui-navigate-right go-router-link-block">
                    <span class="go-span-fit">个人简介</span>
                </router-link>
            </li>

            <li class="mui-table-view-cell">
                <router-link :to="'/entry/users/' + this.userId + '/clubs/'" class="mui-navigate-right go-router-link-block">
                    <span class="go-span-fit">社团</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>

import { Toast } from 'mint-ui';
import mui from '../../libs/mui/js/mui';
import { request } from 'http';
import * as config from '../../api/config';


export default {
    data() {
        return {
            userId: '',
            username: '',
            nickname: '',
            mobile: '',
            admission_time: '',
            institute: ''
        }
    },
    created() {
        this.$store.commit('setIsShowTabbar', true);
        this.userId = this.$route.params.id;
        this.$store.commit('setTitle', '成员信息');
        this.getUserDetail();
    },
    updated() {
        this.getUserDetail();
    },
    methods: {
        getUserDetail() {
            var getUserDetailToast = Toast({
                message: '获取信息中',
                duration: -1
            });
            this.$api.get('users/' + this.userId + '/', {
                headers: {
                    token: this.$store.getters.getToken
                }
            })
            .then(response => {
                getUserDetailToast.close();
                if (response.data.status === config.STATUS_SUCCESS) {
                    this.username = response.data.user.username;
                    this.nickname = response.data.user.nickname;
                    this.mobile = response.data.user.mobile;
                    this.admission_time = response.data.user.admission_time;
                    this.institute = response.data.institute.name;
                }
                
            })
            .catch(error => {
                getUserDetailToast.close();
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
    


span.go-span-icon-center {
    padding-top: 4%;
}

.go-table-view-no-last-line::after {
    height: 0;
}

.go-circle {
    border-radius: 30px;
}

.go-span-fit {
    margin-right: 60%;
}

.go-table-view-cell-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}


.go-mui-btn {
    width: 93%;
    margin-left: 1%;
}

</style>
