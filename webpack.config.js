var path = require('path');
var webpack = require('webpack');
var config = require('./config');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var glob = require('glob');

var entries = getEntry('./dev/js/*.js'); // 获得入口js文件

// 公共模块的 路径
var commons = [
    './dev/js/libs/jquery.min-1.9.1.js',
    './dev/js/libs/bootstrap.min.js'
]

module.exports = {
    devServer: {
        outputPath: path.join(__dirname, config.distPath)
    },
    entry: Object.assign(entries, { commons }),
    output: {
        path: path.resolve(__dirname, config.distPath),
        publicPath: './../' + config.distPath ,
        filename: 'js/[hash:8].[name].js'
    },
    //devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.js?$/,
            //排除目录,exclude后将不匹配
            exclude: /node_modules/,
            loader: 'babel-loader?presets[]=es2015'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('css!less')
        }, {
            test: /\.json$/,
            loader: 'json'
        }, { 
            test:/\.(swf|ico|gif|jpe|png|woff|svg|ttf|eot?)(\?.*)$/, //限制大小小于10k的 图片和字体. 生成base64编码
            loader:'url-loader?limit=10000'
        }]
    },
    resolve: {
        alias: {
            //jquery: path.join(__dirname, 'src/js/libs/jquery1.8.3')
        }
    },
    plugins: [
        new ExtractTextPlugin('css/[contenthash:8].[name].css', {
            //allChunks: true
        }),
        new CopyWebpackPlugin([
            { from: config.devPath + '/js/libs', to: 'js/libs', toType: 'dir' },
            { from: config.devPath + '/css/bootstrap.min.css', to: 'css/bootstrap.min.css', toType: 'file' },
            { from: config.devPath + '/img', to: 'img', toType: 'dir'},
            { from: config.devPath + '/fonts', to: 'fonts', toType: 'dir' },
            { from: config.devPath + '/video', to: 'video', toType: 'dir' }
        ]),
        //以下代码为压缩代码插件,在打包的时候用,开发环境下会减慢编译速度
        new webpack.optimize.UglifyJsPlugin({
            //这里是去除错误提示的配置
            compress: {
                warnings: false,
                drop_console: true,
                dead_code: true
            },
            minimize: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
}

function getEntry(globPath) {
    var entries = {},
        basename, tmp, pathname;

    glob.sync(globPath).forEach(function(entry) {
        basename = path.basename(entry, path.extname(entry));
        tmp = entry.split('/').splice(-3);
        pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
        /*entries[pathname] = entry;*/
        entries[basename] = entry;
    });
    
    return entries;
}

var pages = getEntry('./dist/*.html');

module.exports.plugins.push(
    // 提取公共模块， jquery + bootstarp
    new webpack.optimize.CommonsChunkPlugin({
      names: ['commons'],
      minChunks: Infinity
    })
)

for (var pathname in pages) {
    // 配置生成的html文件，定义路径等
    var conf = {
        filename: pathname + '.html',
        template: pages[pathname], // 模板路径
        minify: {
          removeComments: true, // 是否移除注释
          collapseWhitespace: true // 是否移除空白
        }
    }
    if (pathname in module.exports.entry) {
        conf.chunks = ['commons',pathname];  // 注入页面的js 为公共提取模块和相对应的 js 
        conf.hash = false;
    }
    // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
    module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}


