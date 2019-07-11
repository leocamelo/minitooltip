var gulp      = require('gulp');
var uglify    = require('gulp-uglify');
var rename    = require('gulp-rename');
var webserver = require('gulp-webserver');

var src = 'minitooltip.js';

function js() {
  return gulp
    .src(src)
    .pipe(uglify({ output: { comments: /^!/ } }))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./'));
}

function web() {
  return gulp
    .src('./')
    .pipe(webserver({ livereload: true, open: '/example' }));
}

exports.js = js;
exports.web = web;
exports.default = gulp.parallel(js, web);
