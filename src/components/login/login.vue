<template>
    <div class="go-login-container">
        <span class="go-span-placeholder">
            
        </span>
        <div class="go-icon">
            <img class="mui-media-object go-circle" src="./default.jpeg">
        </div>
        <div class="mui-input-group">
            <div class="mui-input-row">
            <input type="text" class="mui-input-clear" placeholder="学号" v-model="username">
            </div>
            <div class="mui-input-row">
                <input type="password" class="mui-input-password" placeholder="密码" v-model="password">
            </div>
            <div class="mui-button-row">
                <button type="button" class="mui-btn mui-btn-primary" @click="login">登录</button>
            </div>
            <div class="go-text-div">
                <span class="go-text">使用该 App 请您认真阅读 www.busix.com 上的用户说明</span>
            </div>
            <div class="mui-content-padded">
				<div class="link-area">
                    <router-link to="/entry/register/">注册账号</router-link>
                </div>
			</div>
        </div>
    </div>
</template>

<script>

import mui from '../../libs/mui/js/mui';
import { Toast } from 'mint-ui';
import * as config from '../../api/config';

export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login() {
            if (this.username === '' || this.password === '') {
                Toast({
                    message: '用户名和密码不能为空',
                    duration: 2000
                });
                return;
            }
            var loginingToast = Toast({
                message: '登录中...',
                duration: -1
            });
            this.$api.post('login/', {
                username: this.username,
                password: this.$md5(this.password)
            })
            .then(response => {
                loginingToast.close();
                var status = response.status;
                if (status === config.STATUS_SUCCESS) {
                    Toast({
                        message: '登录成功',
                        duration: 1000
                    });
                    this.$store.commit('setUsername', response.username);
                    this.$store.commit('setToken', response.token);
                    this.$router.push({ path: '/home'});
                } else if (status === config.STATUS_ERROR){
                    Toast({
                        message: response.msg,
                        duration: 2000
                    });
                }
            });
        }
    }
}
</script>

<style scoped>

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
    height: 120px;
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

.mui-btn {
    width: 93%;
    margin-left: 7%;
}

.mui-button-row {
    margin-top: 20%;
}

/* .mui-title {
    color: #ffffff;
}

.mui-bar {
    background-image: url(bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    box-shadow: 0 0 0 0;
} */

.go-icon {
    padding-left: 30%;
}

input {
    text-align: center;
}

html, body {
    background-color: #888888;
}

.mui-media-object {
    width: 60%;
    height: 60%;
}

</style>
