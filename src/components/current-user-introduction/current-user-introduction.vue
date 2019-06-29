<template>
    <div>
        <textarea v-model="userIntroduction" class="go-textarea-space">
            
        </textarea>
        <div class="mui-button-row">
            <button type="button" class="mui-btn mui-btn-primary go-mui-btn" @click="introductionSave">保存</button>
        </div>
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
            userIntroduction: ''
        }
    },
    methods: {
        introductionSave() {
            this.$axios.patch('users/' + this.userId + '/', {
                    dict: {
                        introduction: this.userIntroduction
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
        },
        getUserIntroduction() {
            var getDescToast = Toast({
                message: '获取信息中...',
                duration: -1
            });
            this.$api.get('users/' + this.userId + '/', {
                headers: {
                    token: this.$store.getters.getToken
                }
            })
            .then(response => {
                getDescToast.close();
                if (response.data.status === config.STATUS_SUCCESS) {
                    this.userIntroduction = response.data.user.introduction;
                } else if (response.data.status === config.STATUS_ERROR) {
                    Toast({
                        message: response.msg,
                        duration: 1000
                    });
                    this.$router.push('/entry/login/');
                }
            })
            .catch(error => {
                getDescToast.close();
                Toast({
                    message: '网络连接异常',
                    duration: 500
                })
            });
        }
    },
    created() {
        this.userId = this.$store.getters.getUserId;
        this.getUserIntroduction();
        this.$store.commit('setIsShowTabbar', false);
    },
    destroyed() {
        this.$store.commit('setIsShowTabbar', true);
    }
}
</script>

<style scoped>
    
.go-textarea-space {
    width: 100%;
    height: 500px;
}

</style>
