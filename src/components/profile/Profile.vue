<template>
    <div>
        <ul class="mui-table-view go-table-view-no-last-line">
            <li class="mui-table-view-cell go-table-view-cell-flex">
                <span class="go-span-icon-center">头像</span>
                <span>
                    <img class="mui-media-object go-circle" src="./default.jpeg"/>
                </span>
            </li>

            <li class="mui-table-view-cell go-table-view-cell-flex">
                <span>学号</span>
                <span>{{ username }}</span>
            </li>

            <li class="mui-table-view-cell go-table-view-cell-flex">
                <span>姓名</span>
                <span>{{ nickname }}</span>
            </li>

            <li class="mui-table-view-cell">
                <router-link to="/home/profile/mobile_edit/" class="mui-navigate-right go-router-link-block">
                    <span class="go-span-fit">手机</span>
                    <span>{{ mobile }}</span> 
                </router-link>
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
                <router-link to="profile/introduction/" class="mui-navigate-right go-router-link-block">
                    <span class="go-span-fit">个人简介</span>
                </router-link>
            </li>

            <li class="mui-table-view-cell">
                <router-link to="profile/clubs/" class="mui-navigate-right go-router-link-block">
                    <span class="go-span-fit">社团</span>
                </router-link>
            </li>

            <li class="mui-table-view-cell">
                <router-link to="profile/applications/" class="mui-navigate-right go-router-link-block">
                    <span class="go-span-fit">申请的社团</span>
                </router-link>
            </li>
            
             <div class="mui-button-row">
                <button type="button" class="mui-btn mui-btn-danger go-mui-btn" @click="logout">退出</button>
            </div>
        </ul>
    </div>
</template>

<script>

import { Toast } from 'mint-ui';
import mui from '../../libs/mui/js/mui';
import { request } from 'http';
import * as config from '../../api/config';
import { constants } from 'crypto';


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
		this.userId = this.$store.getters.getUserId;
        this.getUserDetail();
        this.$store.commit('setTitle', '我的信息');
	},
	methods: {
        logout() {
            var logoutToast = Toast({
                message: '正在登出...',
                duration: -1
            })
            this.$axios.delete('users/' + this.$store.getters.getUserId + '/', {
                headers: {
                    token: this.$store.getters.getToken
                }
            })
            .then(response => {
                logoutToast.close();
                if (response.data.status === config.STATUS_SUCCESS) {
                    this.$router.push('/entry/login/');
                } else if (response.data.status === config.STATUS_ERROR) {
                    Toast({
                        message: response.data.msg,
                        duration: 500
                    });
                }
            })
            .catch(error => {
                logoutToast.close();
                getUserDetailToast.close();
                Toast({
                    message: '网络连接异常',
                    duration: 500
                });
            });
        },
		getUserDetail() {
            var getUserDetailToast = Toast({
                message: '加载中...',
                duration: -1
            })
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
                    this.$store.commit('setOwnedClubList', response.data.clubs);
                    this.$store.commit('setMobile', this.mobile);
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

<style>


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



/* 



.go-text-div {
    margin-left: 7%;
    line-height: 10px;
}

.go-text {
    text-align: left;
    font-size: 10px;
    color: #888888;
    line-height: 12px;
}

.go-span-placeholder {
    display: block;
    height: 70px;
}

.link-area {
    padding-left: 35%;
}

.go-login-container {
    width: 60%;
    height: 100%;
    margin-left: 20%;
}

.mui-input-group:before {
    height: 0;
}

.mui-input-group:after {
    height: 0;
}

.go-mui-btn {
    width: 93%;
    margin-left: 7%;
}

.mui-button-row {
    margin-top: 20%;
}


.go-icon {
    padding-left: 30%;
}

input {
    text-align: center;
}

.mui-media-object {
    width: 60%;
    height: 60%;
}

.go-button {
	margin-bottom: 10%;
} */

</style>

