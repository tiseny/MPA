
# 多页面，JS依赖合并

利用webpack 构建多页面应用。 bootstrap3.3.6， 视频背景，平滑滚动条，ES6。


###安装依赖
```
npm i
```


###运行,由于直接引进了 es6 + less，所以需要每次都编译，编译后的代码已经是压缩合并后的
```
npm start
http://localhost:8080/dist
```

/*{
  "scripts": {
    "watch": "webpack --config webpack.config.js --watch",
    "buildCmd": "gulp && set NODE_ENV=production&& webpack --config webpack.config.js --optimize-minimize && webpack-dev-server --devtool eval --progress --colors --hot --host 0.0.0.0",
    "build": "gulp && NODE_ENV=production webpack --config webpack.config.js --optimize-minimize",
    "start": "gulp && webpack-dev-server --devtool eval --progress --colors --hot --host 0.0.0.0"
  }
}*/