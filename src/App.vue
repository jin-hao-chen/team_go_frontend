<template>
    <div>
        <transition>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>

import router from './router/index';

export default {
    data() {
        return {

        }
    },
    methods: {
    },
    created() {

    },
    mounted() {
    },
    router: router
}

</script>

<style scoped>


</style>
