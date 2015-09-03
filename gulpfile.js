var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('scripts', function() {
  return gulp.src(['./lib/*.js', './js/*.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});
