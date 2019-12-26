
// 请求gulp模块
const gulp = require('gulp')

//请求gulp-sass 模块
const sass = require('gulp-sass')

//创建管道命令，执行sass
//编译sass
gulp.task('sassTask', () => {
    return gulp.src('./src/assets/sass/*.scss')//打包之前sass路径
        .pipe(sass().on('error',sass.logError))
        .pipe(gulp.dest('./src/assets/css'));//打包之后图片路径
});

// 监听sass文件
// ps监听sass文件内容修改自动编译需要安装gulp-server服务器，本篇没有安装，详情请看下一篇
gulp.task('Watch',()=>{
    gulp.watch('./src/assets/sass/*.scss', gulp.series('sassTask', done => done()))
})

//默认管道命令：
gulp.task('default', gulp.series('Watch', done => {}))//可以让默认的时候执行多个命名，在 gulp.series() 中添加即可

