var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var webserver = require('gulp-webserver');
var src = 'minitooltip.js';

gulp.task('uglify', function(){
  gulp.src(src)
  .pipe(uglify({ preserveComments: 'license' }))
  .pipe(rename({ extname: '.min.js' }))
  .pipe(gulp.dest('./'));
});

gulp.task('webserver', function(){
  gulp.src('./')
  .pipe(webserver({
    livereload: true,
    directoryListing: true,
    open: true
  }));
});

gulp.task('default', ['uglify', 'webserver'], function(){
  gulp.watch(src, ['uglify']);
});
