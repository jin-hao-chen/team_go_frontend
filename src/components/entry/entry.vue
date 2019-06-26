<template>
    <div>
        <header :class="goBackClass">
			<!-- <h1 class="mui-title">社团 GO</h1> -->
		</header>
        <keep-alive>
            <transition>
                <router-view></router-view>
            </transition>
        </keep-alive>
    </div>
</template>

<script>

import '../../libs/mui/css/mui.css';

const commonClass = 'mui-bar mui-bar-nav';
const goBackClass = 'mui-bar mui-bar-nav mui-action-back mui-icon mui-icon-left-nav mui-pull-left';

export default {
    data() {
        return {
            goBackClass: commonClass
        }
    },
    updated() {
        if (this.$router.currentRoute.path === '/entry/login/') {
            this.goBackClass = commonClass;
        } else {
            this.goBackClass = goBackClass;
        }
    }
}
</script>

<style scoped>
    
.mui-title {
    color: #ffffff;
}

.mui-bar {
    /* background-color: #1478f6; */
    background-image: url(bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    box-shadow: 0 0 0 0;
}

.mui-icon-left-nav {
    padding-top: 10px;
}


</style>

