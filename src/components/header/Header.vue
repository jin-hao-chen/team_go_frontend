<template>
    <div>
        <mt-header class="go-font" :title="title" fixed></mt-header>
    </div>
</template>

<script>

export default {
    props: ['title']
}
</script>

<style scoped>

.go-font {
    font-size: 17px;
}

.mint-header {
    background-color: #f7f7f7;
    color: #ffffff;
    box-shadow: 0 0px 1px #ccc;
    background-image: url("../../static/images/bg.png");
    background-repeat: no-repeat;
    background-size:100% 100%;
}

</style>


