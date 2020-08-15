const {src, dest, series, parallel, watch} = require('gulp');

const del = require('del')
const browserSync = require('browser-sync');
// 自动创建一个开发服务器
const bs = browserSync.create()

const loadPlugins  = require('gulp-load-plugins')
const plugins = loadPlugins()
let config = {
  // 可以在这里配置默认参数
  build: {
    src: 'src',
    temp: 'temp',
    public: 'public',
    dist: 'dist',
    paths: {
      images: 'assets/images/**',
      fonts: 'assets/fonts/**',
      scripts: 'assets/scripts/*.js',
      pages: '*.html',
      styles: 'assets/styles/*.scss'
    }

  }
}
// 通过process.cwd()获取到当前命令行所在的目录
const cwd = process.cwd()
// 获取到目录后通过require引入，但是为了如果找不到的话就会报错，所以使用try...catch去捕捉错误
try {
  const configData = require(`${cwd}/pages.config.js`)
  // 如果有默认配置的话，就合并默认配置和传递过来的配置
  config = Object.assign({},config, configData)
} catch (error) {
  
}
const style = () => {
  // {base: 'src'}基准路径表示把src后面的assets/styles文件结构一起在temp输出
  return src(config.build.paths.styles,{base: config.build.src, cwd: config.build.src}) // 未替换前 src('src/assets/styles/*.scss',{base: 'src'})
  // outputStyle是设置转义之后的格式，这里是让花括号独占一行
  .pipe(plugins.sass({outputStyle: 'expanded'}))
  .pipe(dest(config.build.temp))
}
const script = () => {
  return src(config.build.paths.scripts,{base: config.build.src, cwd: config.build.src}) // 未替换前 src('src/assets/scripts/*.js',{base: 'src'})
  // babel什么参数都不传的话就基本上是原文输出，未做处理的，因为babel
  // 只是平台，只提供环境，转义这些是是有babel内部的插件去处理的
  // 所以还需要安装@babel/core @babel/preset-env，它们表示会打包所有的特性
  .pipe(plugins.babel({presets:[require('@babel/preset-env')]}))
  .pipe(dest(config.build.temp))

}
const page = () => {
  return src('*.html',{base: config.build.src, cwd: config.build.src}) // 未替换前 src('src/*.html',{base: 'src'})
  // 当模版中我们的数据不是写死的而是需要传递数据过去时
  // 可以通过swig传递参数
  .pipe(plugins.swig({data: config.data, defaults: { cache: false }}))
  .pipe(dest(config.build.temp))
}
const image = () => {
  // images/**表示找到images下面的所有文件
  return src(config.build.paths.images,{base: config.build.src, cwd: config.build.src}) // 未替换前 src('src/assets/images/**',{base: 'src'})
  .pipe(plugins.imagemin())
  .pipe(dest(config.build.dist))
}
const font = () => {
  // fonts/**表示找到fonts下面的所有文件
  return src(config.build.paths.fonts,{base: config.build.src, cwd: config.build.src})
  .pipe(plugins.imagemin())
  .pipe(dest(config.build.dist))
}
// 其他文件不做任何处理直接导出
const extra = () => {
  return src('**',{base: config.build.public, cwd: config.build.public}) // 未替换前 src('public/**',{base: 'public'})
  .pipe(dest(config.build.dist))
}
const clean = () => {
  return del([config.build.dist, config.build.temp])
}

const serve = () => {
  watch(config.build.paths.styles,{cwd: config.build.src}, style)  // 未替换前 watch('src/assets/styles/*.scss', style)
  watch(config.build.paths.scripts, {cwd: config.build.src}, script) // 未替换前 watch('src/assets/scripts/*.js', {cwd: config.build.src}, script)
  watch('*.html',{cwd: config.build.src}, page)
  // 都是开发阶段不需要进行编译的，因为图片这些只是进行了无损压缩，所以不需要进行构建
  watch([
    config.build.paths.images,
    config.build.paths.fonts
  ], {cwd: config.build.src}, bs.reload)
  watch('**',{cwd: config.build.public}, bs.reload)
  // 初始化服务器并启动
  bs.init({
    // 关掉页面browser-sync是否已经连接上的提示
    notify: false,
    // 指定端口
    port: 5000,
    // 监听temp里面的所有文件，修改temp里面的文件会自动更新到浏览器
    files: `${config.build.temp}/**`,
    server: {
      // 自动打开浏览器
      // open: false,
      // 指定网站根目录,即浏览器运行的目录文件,当为数组时，它会依次寻找
      baseDir: [config.build.temp, config.build.src, config.build.public],
      // baseDir: 'dist',
      // 特殊路由优先级高于baseDir
      routes: {
        // '/node_modules'指的就是temp里面的用到的
        // 而node_modules是相对于根目录的一个相对路径，
        // 这样启动dist后就会指向根目录下的node_modules了
        '/node_modules': 'node_modules'
      }
    }
  })
}
const useref = () => {
  return src('*.html',{base: config.build.temp, cwd: config.build.temp})
  // 转换对应的构建注释进行合并 接收对象为参数searchPath表示需要从那个文件找需要合并压缩的文件,这里的点号表示源代码的根目录
  .pipe(plugins.useref({searchPath: [config.build.temp,'.']}))
  // html js css
  // 因为之前已经把构建注释进行了转换所以再次转换的时候就不会生效了，需要执行compile重新生成后在执行就可以了
  .pipe(plugins.if(/\.js$/,plugins.uglify()))
  .pipe(plugins.if(/\.css$/,plugins.cleanCss()))
  // htmlmin默认不会压缩换行符，不会压缩行内css以及script标签内的js需传参数进去
  .pipe(plugins.if(/\.html$/,plugins.htmlmin({collapseWhitespace: true, minifyJS: true,minifyCSS: true})))
  .pipe(dest(config.build.dist))
}
// 无任何关联所以使用parallel并行任务
const compile = parallel(style, script, page);
// build上线之前所需要的编译的
// series串行任务先执行clean删除dist目录在去生成dist目录
const build = series(
  clean,parallel(
    series(
      compile,
      useref
      ), 
    extra, 
    image, 
    font)
      )
// 在开启服务之前要先创建dist文件
const develop = series(compile, serve)
module.exports = {
  build,
  clean,
  develop
}





