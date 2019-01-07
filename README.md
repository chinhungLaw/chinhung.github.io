
### 安装依赖

```
npm install
```

### 开发启动

```
npm start
```

之后打开 http://127.0.0.1:8080/home.html

### 发布构建

*发布同学操作, 支持同学可以看一下最后发布到线上的代码*

```
npm run build
```

## 规范

- 禁止使用外部`js`/`css`, 所有资源必须放置项目下, 使用相对路径引用, 可以使用`node_modules`模块
- 资源相对路径必须以`.`开头, 错误: `<img src="images/x.png">`, 正确: `<img src="./images/x.png">`
- 1个页面必须包括1个入口`index.js`和1个`index.html`, 分别命名`pages/页面名/index.js` `pages/页面名/index.html`
- 资源请勿在`index.html`里使用`<link rel="stylesheet" href="">`|`<script src=""></script>`引入, 均在`index.js`使用`import`引入
- 如果需要`babel`/`scss`/`less`, 可以自行扩展`webpack.config.js`

## 接口

参考 [API.md](API.md)
