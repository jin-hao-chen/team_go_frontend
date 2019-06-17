<template>
<!-- /main/ -->
    <div class="go-container">
        <go-header :title="title"></go-header>
        
        <transition>
            <router-view></router-view>
        </transition>

        <go-footer></go-footer>
    </div>
</template>

<script>

/* 除了 .js 文件的后缀可以省略之外, 其余都要加上 */
import Header from '../header/Header.vue';
import Footer from '../footer/Footer.vue';

export default {
    data: function() {
        return {
            title: '社团 GO'
        };
    },
    methods: {
        getTitle: function() {
            var fullPath = this.$router.history.current.fullPath;
            var splited = fullPath.split('/');
            var suffix = splited[splited.length - 1];
            return suffix;
        },
        changeTitle: function() {
            var title = this.getTitle();
            if (title === 'team_list') {
                this.title = '搜搜';
            } else if (title === 'profile') {
                this.title = '我的';
            }
        }
    },
    components: {
        'go-header': Header,
        'go-footer': Footer
    },
    created: function() {
        this.changeTitle();
    },
    mounted: function() {

    },
    updated: function() {
        this.changeTitle();
    },
}
</script>

<style scoped>

.go-container {
    padding: 0;
    padding-top: 40px;
    /* 隐藏滚动条, 如果不隐藏的话, 在页面切换的时候会导致新进来页面的 tabbar 消失以及 Header 的字体错位,
    transition 的实质是现将要显示的页面放在 view port 之外, 再将其一进来, 所以肯定会有滚动条, 但是这样会影响视觉效果, 对
    用户也是不必要的 */
    overflow-x: hidden;
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
