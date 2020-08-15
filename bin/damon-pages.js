#!/usr/bin/env node

process.argv.push('--cwd')
// 当前命令行所在根目录
process.argv.push(process.cwd())
process.argv.push('--gulpfile')
// require是载入这个模块，而resolve是找到这个路径所对应的文件路径。resolve接收一个字符串形式的相对路径
// 找到我们编写的gulpfile文件的路径，我们这个的gulpfile是在‘..bin/index.js’
// 但是我们package.json文件中的main字段已经配置了这个路径所以可以resolve通过传入‘..’
// 会自动找到package.json中的main字段
process.argv.push(require.resolve(".."))
require('gulp/bin/gulp')
