<template>
<!-- /main/ -->
    <div class="go-container">
        <go-header :goBackClass="goBackClass"></go-header>
            <router-view></router-view>
        <go-tabbar v-show="$store.getters.getIsShowTabbar"></go-tabbar>
    </div>
</template>

<script>

/* 除了 .js 文件的后缀可以省略之外, 其余都要加上 */
import Header from '../header/header.vue';
import Tabbar from '../tabbar/tabbar.vue';
import mui from '../../libs/mui/js/mui';

import '../../static/css/remove_underline.css';

import '../../libs/mui/css/mui.css';

const commonClass = 'mui-bar mui-bar-nav';
const goBackClass = 'mui-bar mui-bar-nav mui-action-back mui-icon mui-icon-left-nav mui-pull-left';


export default {
    name: 'home',
    data() {
        return {
            title: '社团 GO',
            goBackClass: commonClass
        };
    },
    methods: {
        changeGoBackClass() {
            if (this.$router.currentRoute.path === '/home/club_list/' || this.$router.currentRoute.path === '/home/club_list' 
            || this.$router.currentRoute.path === '/home/profile/' || this.$router.currentRoute.path === '/home/profile') {
                this.goBackClass = commonClass;
            } else {
                this.goBackClass = goBackClass;
            }
        },
        changeTabbar() {
            // if (this.$router.currentRoute.path === '/home/club_list/' || this.$router.currentRoute.path === '/home/club_list'
            // || this.$router.currentRoute.path === '/home/profile/' || this.$router.currentRoute.path === '/home/profile'
            // || this.$router.currentRoute.path === '/home/notification/' || this.$router.currentRoute.path === '/home/notification') {
            //     this.isShowTabbar = true;
            // } else {
            //     this.isShowTabbar = false;
            // }
        }
    },
    components: {
        'go-header': Header,
        'go-tabbar': Tabbar
    },
    created() {
        this.changeGoBackClass();
        // this.changeTabbar();
        this.$store.commit('setIsShowTabbar', true);
    },
    updated() {
        this.changeGoBackClass();
        this.changeTabbar();
    }
}
</script>

<style scoped>

.go-container {
    padding: 0;
    padding-top: 40px;
    /* 隐藏滚动条, 如果不隐藏的话, 在页面切换的时候会导致新进来页面的 tabbar 消失以及 Header 的字体错位,
    transition 的实质是现将要显示的页面放在 view port 之外, 再将其一进来, 所以肯定会有滚动条, 但是这样会影响视觉效果, 对
    用户也是不必要的, 在前期该选项有用, 但是此项目在后期的时候 overflow-x 会导致在 iPhone 真机上什么都不显示, 去掉就会在 iPhone
	* 上有显示(并且显示地非常正常), 但是去掉之后浏览器和 Android 的 tabbar 就出现上面的问题 */
    /* overflow-x: hidden; */
}

.v-enter {
  opacity: 0;
  transform: translateX(100%);
}

.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  /* 防止页面过渡时, 即将进入页面的页面的内容先下降再上升到指定的位置 */
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease-in-out;
}


</style>
