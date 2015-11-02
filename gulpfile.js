var gulp    = require('gulp'),
    gutil   = require('gulp-util'),
    uglify  = require('gulp-uglify'),
    concat  = require('gulp-concat');

var del     = require('del');
var minifyHTML = require('gulp-minify-html');
var minifyCSS  = require('gulp-minify-css');

gulp.task('minify', function () {
  gulp.src('converter.js')
  .pipe(uglify())
  .pipe(gulp.dest('minified'));

  gulp.src('./index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('./minified/'))

  gulp.src('./*.css')
   .pipe(minifyCSS({keepBreaks:true}))
   .pipe(gulp.dest('./minified/'))

   gulp.src('./tests/*.css')
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest('./minified/tests/'))

  gulp.src('./tests/*.html')
    .pipe(minifyHTML({keepBreaks:true}))
    .pipe(gulp.dest('./minified/tests/'))

  gulp.src('./tests/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('./minified/tests/'))
});

gulp.task('clean', function(cb) {
  del(['minified/*'], cb);
});
