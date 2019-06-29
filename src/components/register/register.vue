<template>
    <div class="go-login-container">
        <span class="go-span-placeholder"></span>
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
            <div class="mui-input-row">
                <input type="text" class="mui-input-clear" placeholder="姓名" v-model="nickname">
            </div>
            <div class="mui-input-row">
                <input type="text" class="mui-input-clear" placeholder="手机号" v-model="mobile">
            </div>
            <div class="mui-input-row">
                <input type="text" readonly class="mui-input-clear" placeholder="入学时间" v-model="admission_time" @focus="showDateSelector">
            </div>
            <div class="mui-input-row">
                <input type="text" readonly class="mui-input-clear" placeholder="学院" v-model="institute" @focus="showInstituteSelector">
            </div>
            <div class="mui-button-row">
                <button type="button" class="mui-btn mui-btn-primary go-mui-btn" @click="reqister">注册</button>
            </div>
        </div>
    </div>
</template>

<script>

/* Import mui.js */
import mui from '../../libs/mui/js/mui';
import { constants } from 'crypto';
import { request } from 'http';
import { Toast } from 'mint-ui';
import * as config from '../../api/config';

export default {
    data() {
        return {
            username: '',
            password: '',
            nickname: '',
            mobile: '',
            admission_time: '',
            institute_id: 0,
            institute: '',
            instituteList: []
        }
    },
    methods: {
        reqister() {
            if (this.username === '' || this.password === '' || this.nickname === '') {
                Toast({
                    message: '名称和密码不能为空',
                    duration: 1000
                });
                return;
            }
            var usernamePattern = /[0-9]{10}/;
            if (!usernamePattern.test(this.username)) {
                Toast({
                    message: '用户名不符合要求',
                    duration: 1000
                });
                return;
            }
            if (this.mobile === '') {
                Toast({
                    message: '手机号不能为空',
                    duration: 1000
                });
                return;
            }
            var mobilePattern = /[0-9]{11}/;
            if (!mobilePattern.test(this.mobile)) {
                Toast({
                    message: '手机号码格式不正确',
                    duration: 1000
                });
                return;
            }
            if (this.admission_time === '' || this.institute === '') {
                Toast({
                    message: '学校信息不能为空',
                    duration: 1000
                });
                return;
            }
            var password = this.$md5(this.password);
            var registerToast = Toast({
                    message: '注册中...',
                    duration: -1
            });
            this.$api.post('register/', {
                username: this.username,
                password: password,
                nickname: this.nickname,
                mobile: this.mobile,
                admission_time: this.admission_time,
                institute_id: this.institute_id
            })
            .then(response => {
                registerToast.close();
                if (response.status === config.STATUS_SUCCESS) {
                    this.$store.commit('setUsername', this.username);
                    Toast({
                        message: '跳转至登录...',
                        duration: 500
                    });
                    this.$router.push('/entry/login/');
                } else if (response.status === config.STATUS_ERROR) {
                    Toast({
                        message: response.msg,
                        duration: 500
                    });
                }  
            })
            .catch(error => {
                registerToast.close();
                Toast({
                    message: '网络连接异常',
                    duration: 1000
                });
            });
        },
        showDateSelector() {
            var dtpicker = new mui.DtPicker({
                type: "date",//设置日历初始视图模式 
                beginDate: new Date(2010, 1, 1),//设置开始日期 
                endDate: new Date(2099, 1, 1),//设置结束日期 
                labels: ['年', '月', '日'],//设置默认标签区域提示语 
	        });
            dtpicker.show(e => {
                this.admission_time = e.text;
            });
        },
        getInstituteList() {
            this.$api.get('institutes', {
            })
            .then(response => {
                this.instituteList = response.data.instituteList;
            })
            .catch(error => {
                Toast({
                    message: '网络连接异常',
                    duration: 1000
                });
            });
        },
        showInstituteSelector() {
            var picker = new mui.PopPicker();
            var data = [];
            for (var i = 0; i < this.instituteList.length; ++i) {
                data.push({
                    value: this.instituteList[i].id,
                    text: this.instituteList[i].name
                });
            }
            picker.setData(data);
            picker.show(SelectedItem =>  {
                this.institute = SelectedItem[0].text;
                this.institute_id = SelectedItem[0].value;
            });
        }
    },
    created() {
        this.getInstituteList();
        this.$store.commit('setTitle', '注册');
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

.go-mui-btn {
    width: 93%;
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

.mui-button-row {
    margin-top: 8%;
}

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

