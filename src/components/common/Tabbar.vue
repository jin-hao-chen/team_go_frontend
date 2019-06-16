<template>
    <div>
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/team_list">
				<span class="mui-icon mui-icon-home-filled">
                </span>
				<span class="mui-tab-label">社团</span>
			</router-link>
			<router-link class="mui-tab-item" to="/notification">
				<span class="mui-icon mui-icon-chat">
					<span class="mui-badge">99</span>
				</span>
				<span class="mui-tab-label">消息</span>
			</router-link>
			<router-link class="mui-tab-item" to="/profile">
				<span class="mui-icon mui-icon-extra mui-icon-extra-people"></span>
				<span class="mui-tab-label">我的</span>
			</router-link>
		</nav>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>

.mui-bar {
    -webkit-box-shadow: none;
    box-shadow: none;
}

</style>
