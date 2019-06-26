<template>
    <div>
        <h1>MyTeam</h1>
    </div>
</template>

<script>
export default {
    watch: {
        '$router': function() {
            this.$store.commit('setTitle', '社团信息');
        }
    },
    methods: {
    }
}
</script>

<style scoped>
    
</style>
