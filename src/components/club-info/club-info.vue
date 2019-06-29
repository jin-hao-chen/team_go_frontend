<template>
    <div>
        <div class="mui-page-content">
            <div class="mui-scroll-wrapper">
                <div class="mui-scroll">
                    <ul class="mui-table-view mui-table-view-chevron">
                        <li class="mui-table-view-cell">
                            <router-link :to="'/home/club_info/' + clubId + '/description/'" class="mui-navigate-right">
                                社团描述
                            </router-link>
                        </li>
                        <li class="mui-table-view-cell">
                            <router-link :to="'/home/club_info/' + clubId + '/members/'" class="mui-navigate-right">
                                社团成员
                            </router-link>
                        </li>
                        <li class="mui-table-view-cell">
                            <a href="javascript:;" class="mui-navigate-right" @click="apply">
                                申请
                            </a>
                        </li>
                        <li class="mui-table-view-cell" v-if="isManage(clubId)">
                            <router-link :to="'/home/club_info/' + clubId + '/applications/'" class="mui-navigate-right">
                                申请人
                            </router-link>
                        </li>
                    </ul>
                </div>
			</div>
		</div>
    </div>
</template>

<script>

import '../../libs/mui/css/mui.css';
import '../../libs/mui/css/icons-extra.css';
import '../../libs/mui/css/mui.picker.css';
import '../../libs/mui/css/mui.poppicker.css';
import '../../libs/mui/css/mui.dtpicker.css';
import { Toast } from 'mint-ui';
import * as config from '../../api/config';
import { MessageBox } from 'mint-ui';
import { constants } from 'crypto';


export default {
    data() {
        return {
            clubId: '',
            userId: '',
            department: '',
            manageClubsIds: [],
        }
    },
    methods: {
        getManageClubsIds() {
            var toast = Toast({
                message: '加载中...',
                duration: -1
            });
            this.$api.get('user_club/?userId=' + this.userId, {
                headers: {
                    Token: this.$store.getters.getToken
                }
            })
            .then(response => {
                toast.close();
                var user_club = response.data.user_club;
                for (var i = 0; i < user_club.length; ++i) {
                    this.manageClubsIds.push(user_club[i].club);
                }
            })
            .catch(error => {
                toast.close();
                Toast({
                    message: '网络连接异常',
                    duration: 500
                });
            });
        },
        isManage(clubId) {
            for (var i = 0; i < this.manageClubsIds.length; ++i) {
                if (clubId == this.manageClubsIds[i]) {
                    return true;
                }
            }
            return false;
        },
        apply() {
            MessageBox.prompt('请输入申请的部门名').then(({ value, action }) => {
                if (action === 'confirm') {
                    if (value === '') {
                        Toast({
                            message: '部门名不能为空',
                            duration: 1000
                        });
                        return;
                    }
                    this.department = value;
                    this._apply()
                }
            });
        },
        _apply() {
            var toast = Toast({
                message: '加载中...',
                duration: -1
            });
            this.$axios.post('applications/', {
                userId: this.userId,
                clubId: this.clubId,
                department: this.department
            }, {
                headers: {
                        token: this.$store.getters.getToken
                }
            })
            .then(response => {
                toast.close();
                if (response.data.status === config.STATUS_SUCCESS) {
                    Toast({
                        message: '申请成功',
                        duration: 1000
                    });
                } else if (response.data.status === config.STATUS_ERROR) {
                    Toast({
                        message: response.data.msg,
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
    },
    created() {
        this.clubId = this.$route.params.id;
        this.$store.commit('setTitle', '社团信息');
        this.userId = this.$store.getters.getUserId;
        this.getManageClubsIds();
    }
}
</script>

<style scoped>

.mui-table-view-cell::after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 15px;
    height: 1px;
    content: '';
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    background-color: #c8c7cc;
}

.mui-table-view {
    background-color: #ffffff;
}

.mui-bar {
    padding-top: 10px;
    background-color: #2683ff;
}



</style>
