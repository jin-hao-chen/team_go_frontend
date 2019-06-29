<template>
     <div> 
         <!-- <div id="go-refreshContainer" class="mui-scroll-wrapper">
            <div class="mui-scroll"> -->
                <div class="mui-button-row">
                    <button type="button" class="mui-btn mui-btn-primary go-mui-btn" @click="descriptionSave">保存</button>
                </div>
                <quill-editor class="ql-editor" v-model="clubDescription">
                </quill-editor>
            <!-- </div>
        </div> -->
    </div>
</template>


<script>

import { Toast } from 'mint-ui';
import mui from '../../libs/mui/js/mui';
import { request } from 'http';
import * as config from '../../api/config';

export default {
    name: 'club-description',
    data() {
        return {
            clubId: '',
            clubDescription: ''
        }
    },
    created() {
        this.clubId = this.$route.params.id;
        this.getClubDescription();
        
        this.$store.commit('setTitle', '描述');
        this.$store.commit('setIsShowTabbar', false);
    },
    destroyed() {
        this.$store.commit('setIsShowTabbar', true);
    },
    methods: {
        descriptionSave() {
            this.$axios.patch('clubs/' + this.clubId + '/', {
                    dict: {
                        description: this.clubDescription
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
        getClubDescription() {
            var getDescToast = Toast({
                message: '获取信息中...',
                duration: -1
            });
            this.$api.get('clubs/' + this.clubId, {
                headers: {
                    token: this.$store.getters.getToken
                }
            })
            .then(response => {
                getDescToast.close();
                if (response.data.status === config.STATUS_SUCCESS) {
                    this.clubDescription = response.data.description;
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
    }
}
</script>

<style scoped>
    
.go-desc-container {
    padding-top: 1%;
    color: #000000;
    width: 100%;
    height: 100%;
}

</style>
