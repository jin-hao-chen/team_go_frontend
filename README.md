# Team GO Vue.js Project

## 如何使用 MUI 库

    + 基本步骤
        1. 导入 css 样式表
        2. 导入 js 文件
        3. 初始化 `mui.init()`
        4. 处理谷歌浏览器的 preventDefault 错误, `mui('body').on('tap', 'a', function() { document.location.href = this.href; });`
        5. 修改源码让上拉刷新支持 Android 平台, 见 (修改源码)[https://www.codetd.com/article/5612260], 也可以直接使用本项目中的 **mui.js**
        6. 修改源码, 在 `mui.js` 的末尾添加 `window.mui = mui` 是 mui 成为全局变量

    + 使用 scroll

        1. 先完成基本步骤
        2. 导入 mui
        3. 创建 scroll 的选项

        ```js

        var options = {
            scrollY: true,
            scrollX: false,
            startX: 0,
            startY: 0,
            indicators: false, // 默认为 true, 改为 false 为了能在安卓上运行
            deceleration:0.0006,
            bounce: false // 默认为 true, 改为 false 为了能在安卓上运行
        }
        ```
        4. 在 created 方法方法中调用

        ```js

        for(var i = mui.hooks.inits.length - 1, item; i >= 0; i--){
            item = mui.hooks.inits[i];
            if(item.name === "pullrefresh"){
                item.repeat = true;
            }
        }
        ```
        5. 在 mounted 方法中调用

        ```js
        this.$mui.init({
            pullRefresh: {
                container:"#go-refreshContainer", // 容器 id
                down: {
                    height: 50, //可选,默认50.触发下拉刷新拖动距离,
                    auto: true, //可选,默认false.首次加载自动下拉刷新一次
                    contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                    contentover : "松开立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                    contentrefresh : "正在刷新数据中...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                    callback: this.pullRefresh
                }
            }
        });
        mui('.mui-scroll-wrapper').scroll(options);
        ```
        6. 在 beforeDestroy 中调用

        ```js

        mui.options.pullRefresh = null;
        ```
        5. 在此提一句, 一般在 mounted 方法中操作 DOM, 在 created 中操作 data
        
## 路由跳转的父子关系

    1. 在 home 中可以清晰地看到每一个 tab 对应的子页面都有 home 中的 header 和 tabbar, 但是在 team\_list 中的每一个 team 项如果被 tap 进去的话就没有了 header 和 tabbar, 这是如何实现的?
    2. 其实很简单, 关键就是路由 router/index.js, 如果组件想要成为子组件, 就在 home 中的 children 填写路由, 就会保留 header 和 tabbar, 如果不想要保留而是进入一个新的页面则在 routes 中新建一个路由

## router-linker-active 默认下划线

    1. router-link 标签最后会被渲染成 a 标签, 但是事后的, 因此需要在每一个需要去掉下划线的 .vue 文件中添加

    ```css

    a.router-link-active {
        text-decrator: none;
    }
    ```