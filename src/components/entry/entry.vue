<template>
    <div>
        <!-- <header :class="goBackClass">
			<h1 class="mui-title">{{ $store.getters.getTitle }}</h1>
		</header> -->
        <!-- <router-view></router-view> -->
        <div class="go-container">
        <go-header :goBackClass="goBackClass"></go-header>
            <router-view></router-view>
        <go-tabbar v-show="$store.getters.getIsShowTabbar"></go-tabbar>
    </div>
    </div>
</template>

<script>

import '../../libs/mui/css/mui.css';
import Header from '../header/header.vue';
import Tabbar from '../tabbar/tabbar.vue';

const commonClass = 'mui-bar mui-bar-nav';
const goBackClass = 'mui-bar mui-bar-nav mui-action-back mui-icon mui-icon-left-nav mui-pull-left';

export default {
    data() {
        return {
            goBackClass: goBackClass
        }
    },
    methods: {
        showBackArrow() {
            if (this.$router.currentRoute.path === '/entry/login/' || this.$router.currentRoute.path === '/entry/login' 
            || this.$router.currentRoute.path === '/entry/users/' || this.$router.currentRoute.path === '/entry/users') {
                this.goBackClass = commonClass;
            } else {
                this.goBackClass = goBackClass;
            }
        }
    },
    created() {
        this.showBackArrow();
        this.$store.commit('setTitle', '登录');
        this.$store.commit('setIsShowTabbar', false);
    },
    updated() {
        this.showBackArrow();
    },
    components: {
        'go-header': Header,
        'go-tabbar': Tabbar
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

