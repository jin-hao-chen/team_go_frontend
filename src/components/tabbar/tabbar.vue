<template>
    <div>
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home/club_list">
				<span class="mui-icon mui-icon-extra mui-icon-extra-find">
                </span>
				<span class="mui-tab-label">搜搜</span>
			</router-link>
			<!-- <router-link class="mui-tab-item" to="/home/notification">
				<span class="mui-icon mui-icon-chat">
					<span class="mui-badge">99</span>
				</span>
				<span class="mui-tab-label">消息</span>
			</router-link> -->
			<router-link class="mui-tab-item" to="/home/profile">
				<span class="mui-icon mui-icon-extra mui-icon-extra-people"></span>
				<span class="mui-tab-label">我的</span>
			</router-link>
		</nav>
    </div>
</template>

<script>
// import '../../static/css/remove_underline.css';
</script>

<style scoped>

.mui-bar {
    -webkit-box-shadow: none;
	box-shadow: 0 0 1px #cccccc;
	background-color: #ffffff;
}


</style>
