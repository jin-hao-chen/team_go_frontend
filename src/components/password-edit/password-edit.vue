<template>
    <div>
        <div class="mui-input-group">
            <div class="mui-input-row">
                <input type="password" class="mui-input-password" placeholder="密码" v-model="password">
            </div>
            <div class="mui-button-row">
                <button type="button" class="mui-btn mui-btn-primary go-mui-btn" @click="passwordChange">修改</button>
            </div>
        </div>
    </div>
</template>

<script>


import mui from '../../libs/mui/js/mui';
import { Toast } from 'mint-ui';
import * as config from '../../api/config';
import { request } from 'http';


export default {
    data() {
        return {
            password: '',
            userId: ''
        }
    },
    methods: {
        passwordChange() {
            this.$axios.patch('users/' + this.userId + '/', {
                    dict: {
                        password: this.$md5(this.password)
                    }
                }, {
                    headers: {
                        token: this.$store.getters.getToken
                    }
                }
            )
            .then(response => {
                if (response.data.status === config.STATUS_SUCCESS) {
                    Toast({
                        message: '修改成功',
                        duration: 500
                    });
                } else if (response.data.status === config.STATUS_ERROR) {
                    Toast({
                        message: response.data.msg,
                        duration: 500
                    });
                }
            })
            .catch(error => {
                Toast({
                    message: '网络连接异常',
                    duration: 500
                });
            });
        }
    },
    created() {
        this.$store.commit('setTitle', '修改手机号');
        this.mobile = this.$store.getters.getMobile;
        this.userId = this.$store.getters.getUserId;
        // this.$store.commit('setIsShowRightWords', true);
        // this.$store.commit('setRightWords', '保存');
    }
}
</script>

<style scoped>
    
.go-mui-btn {
    width: 93%;
    margin-left: 1%;
}

.go-span-placeholder {
    display: block;
    height: 120px;
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

</style>
