<template>
    <div class="container">
        <!-- Header -->
        <mt-header class="go-font" title="社团 GO" fixed></mt-header>
        <!-- Content -->
        <router-view></router-view>
        <!-- Tabbar -->
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item mui-active" to="/team_list">
				<span class="mui-icon mui-icon-list">
                    <span class="mui-badge">9</span>
                </span>
				<span class="mui-tab-label">社团</span>
			</router-link>
			<router-link class="mui-tab-item" to="/profile">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">我的</span>
			</router-link>
		</nav>
    </div>
</template>

<script>



</script>

<style scoped>

.container {
    padding: 0;
    padding-top: 40px;
}

.go-font {
    font-size: 17px;
}

.mint-header {
    background-color: #f7f7f7;
    color: #000000;
    box-shadow: 0 1px 6px #ccc;
}


</style>
