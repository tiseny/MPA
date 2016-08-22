/**
 Gulpfile for gulp-webpack-demo
 created by fwon
*/

var gulp = require('gulp'),
    fileinclude = require('gulp-file-include')


//用于在html文件中直接include文件
gulp.task('fileinclude', function (done) {
    gulp.src(['dev/*.html'])
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
        .pipe(gulp.dest('dist/'))
        .on('end', done);
        // .pipe(connect.reload())
});

//发布
gulp.task('default', ['fileinclude']);
