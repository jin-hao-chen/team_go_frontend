# Team GO Vue.js Project

## 如何使用 MUI 库

    + 基本步骤
        1. 导入 css 样式表
        2. 导入 js 文件
        3. 初始化 `mui.init()`
        4. 处理谷歌浏览器的 preventDefault 错误, `mui('body').on('tap', 'a', function() { document.location.href = this.href; });`
    
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
            indicators: true,
            deceleration:0.0006,
            bounce: true
        }
        ```
        4. 在 mounted 方法中调用 `mui('.mui-scroll-wrapper').scroll(options);`
        5. 在此提一句, 一般在 mounted 方法中操作 DOM, 在 created 中操作 data
