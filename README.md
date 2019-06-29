# Team GO Vue.js Project

## 如何使用 MUI 库

    + 基本步骤
        1. 导入 css 样式表
        2. 导入 js 文件
        3. 初始化 `mui.init()`
        4. 处理谷歌浏览器的 preventDefault 错误, `mui('body').on('tap', 'a', function() { document.location.href = this.href; });`
        5. 修改源码让上拉刷新支持 Android 平台, 见 (修改源码)[https://www.codetd.com/article/5612260], 也可以直接使用本项目中的 **mui.js**
        6. 修改源码, 在 `mui.js` 的末尾添加 `window.mui = mui` 是 mui 成为全局变量, 否则会出现 mui is undefined 的错误

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

        + 使用 picker 系列选择器
            
            * 导入 picker 插件
                1. 将 github 的 mui 项目下载过来, 在目录中所有所有与 dtpicker, picker, poppicker 有关的 css 和 js, 放到项目中
                2. 对于主 mui.js 使用 `import mui from './path/to/mui.js';`, 其他的直接 `import './path/to/picker';` 逐个导入

            * 注意:
                1. iOS 在 input 获取聚焦是会自动调出软键盘, 要解决该现象需要在 input 中添加 readonly 属性

        
## 路由跳转的父子关系

    1. 在 home 中可以清晰地看到每一个 tab 对应的子页面都有 home 中的 header 和 tabbar, 但是在 team\_list 中的每一个 team 项如果被 tap 进去的话就没有了 header 和 tabbar, 这是如何实现的?
    2. 其实很简单, 关键就是路由 router/index.js, 如果组件想要成为子组件, 就在 home 中的 children 填写路由, 就会保留 header 和 tabbar, 如果不想要保留而是进入一个新的页面则在 routes 中新建一个路由
    3. 在 router/index.js 中的路由系统中, 如果出现了路由对象出现了 children 对象, 父对象需要有 `router-view` 为子组件填坑, 否则子组件无法显示

## router-linker-active 默认下划线

    1. router-link 标签最后会被渲染成 a 标签, 但是事后的, 因此需要在每一个需要去掉下划线的 .vue 文件中添加

    ```css

    a.router-link-active {
        text-decrator: none;
    }
    ```

## Vue 中 updated, created, mounted

    1. 父组件中使用 `routerView` 切换子组件, 对父组件是 updated, 但是对子组件是 created 和 mounted

## axios

    1. post 和 put 接受 3 个参数, url, data, config
    2. delete 接受 2 个参数, url, data, 其中 data 是 post 和 put 中的 data 和 config 功能的合并, 在 data 中通过 data 传递参数, 通过 headers 传递响应头