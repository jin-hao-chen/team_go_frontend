<template>
    <div>
        <h1>Notification</h1>
    </div>
</template>

<script>
export default {
    updated() {
        this.$store.commit('setTitle', '消息');
    }
}
</script>

<style scoped>
    
    div {
        width: 100%;
        height: 100%;
        z-index: 999;
    }

</style>
