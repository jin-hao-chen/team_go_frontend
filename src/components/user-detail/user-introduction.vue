<template>
    <div class="go-div-user-introduction-margin">
        <div >
            {{ userIntroduction }}
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
            userId: '',
            userIntroduction: ''
        }
    },
    methods: {
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
        this.userId = this.$route.params.id;
        this.$store.commit('setTitle', '成员简述');
        this.getUserIntroduction();
        this.$store.commit('setIsShowTabbar', false);
    }
}
</script>

<style scoped>

.go-div-user-introduction-margin {
    margin-top: 50px;
}

</style>

