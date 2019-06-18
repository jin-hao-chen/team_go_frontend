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
    data: function() {
        return {

        }
    },
    methods: {
    },
    created: function() {

    },
    mounted: function() {
    },
    router: router
}

</script>

<style scoped>


</style>
