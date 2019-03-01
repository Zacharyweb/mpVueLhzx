# lhzx

> A Mpvue project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 项目构建步骤

1. 使用less语法：依赖插件less-loader 、less

2. 像vue一样使用路由：依赖插件 mpvue-entry 和 mpvue-router-patch

3. 使用组件库：依赖 vant-weapp，[查看使用文档。](https://youzan.github.io/vant-weapp/#/intro)

   > 目前vant已经支持了npm的方式，但是由于node_modules目录下的代码是不会被编进dist目录下的，所以暂时只能用git方式使用。
   
    * 克隆vant仓库

     > 将dist目录下的所有文件复制到你项目的/static/vant/目录下 

     ``` bash
      git clone https://github.com/youzan/vant-weapp.git
     ```

    * 引入

     > 在需要引入的页面目录下的main.json文件中

     ``` javascript
      {
        "usingComponents": {
          "van-button": "/static/vant/button/index",
        }
      }
     ```

    * 使用

    ``` html
     <van-button>测试</van-button>
    ```

4. 配置vuex全局状态管理

5. 使用flyio进行数据交互：依赖插件 flyio
