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
            <input type="text" class="mui-input-clear" placeholder="入学时间" v-model="admission_time" @focus="showDateSelector">
            </div>
            <div class="mui-button-row">
                <button type="button" class="mui-btn mui-btn-primary">注册</button>
            </div>
            <div class="go-text-div">
                <span class="go-text">使用该 App 请您认真阅读 www.busix.com 上的用户说明</span>
            </div>
        </div>
    </div>
</template>

<script>

/* Import mui.js */
import mui from '../../libs/mui/js/mui';
import { constants } from 'crypto';

export default {
    data() {
        return {
            username: '',
            password: '',
            nickname: '',
            mobile: '',
            admission_time: '',
            institue_id: 0
        }
    },
    methods: {
        showDateSelector() {
            var dtpicker = new mui.DtPicker({
                type: "date",//设置日历初始视图模式 
                beginDate: new Date(2018, 1, 1),//设置开始日期 
                endDate: new Date(2022, 1, 1),//设置结束日期 
                labels: ['年', '月', '日'],//设置默认标签区域提示语 
	        });
            dtpicker.show(e => {
                this.admission_time = e.text;
            });
        }
    },
    created() {
        
    },
    mounted() {
        
    },
    updated() {
        
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

.mui-btn {
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

html, body {
    background-color: #888888;
}

.mui-media-object {
    width: 60%;
    height: 60%;
}
    
</style>

