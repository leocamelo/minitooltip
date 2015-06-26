var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename')
var webserver = require('gulp-webserver');
var js = 'minitooltip.js';

gulp.task('compress', function(){
  return gulp.src(js)
  .pipe(uglify())
  .pipe(rename('minitooltip.min.js'))
  .pipe(gulp.dest('./'));
});

gulp.task('webserver', function() {
  gulp.src('./')
  .pipe(webserver({
    livereload: true,
    directoryListing: true,
    open: true
  }));
});

gulp.task('default', ['compress', 'webserver'], function(){
  gulp.watch(js, ['compress']);
});
