
# 多页面，JS依赖合并

webpack 构建多页面应用
mockjs 模拟数据交互 
artTemplate 模版
gulp 拆分页面
es6 
less
...

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