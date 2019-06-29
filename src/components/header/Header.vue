<template>
    <div>
        <header :class="goBackClass">
			<h1 class="mui-title">{{ $store.getters.getTitle }}</h1>
            <span v-if="$store.getters.getIsShowRightWords" class="mui-badge go-mui-badge-right" @click="clickRight"> {{ $store.getters.getRightWords }}</span>
		</header>
    </div>
</template>

<script>

import '../../libs/mui/css/mui.css';

const commonClass = 'mui-bar mui-bar-nav';
const goBackClass = 'mui-bar mui-bar-nav mui-action-back mui-icon mui-icon-left-nav mui-pull-left';


export default {
    name: 'main-header',
    props: ['goBackClass'],
}
</script>

<style scoped>

.go-mui-badge-right {
    color: #ffffff;
    background-color: transparent;
    font-size: 14px;
    border: 0;
    
    padding-top: 4%;
    margin-left: 90%;
    display: inline-block;
    height: 100%;
    width: 40px;
}

.go-font {
    font-size: 17px;
}

.mui-title {
    color: #ffffff;
}

.mui-bar {
    background-image: url(bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    box-shadow: 0 0 0 0;
}

.mui-icon-left-nav {
    padding-top: 10px;
}

</style>


