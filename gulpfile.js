var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('default',function() {
    gulp.watch('sass/**/*.scss',['sass']);
});

gulp.task('scripts', function() {
  return gulp.src(['./lib/*.js', './js/*.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});

//gulp.task('styles', function() {
    //gulp.src('sass/**/*.scss')
    //.pipe(sass().on('error', sass.logError))
    //.pipe(gulp.dest('./css/'));
//});

gulp.task('sass', function () {
    gulp.src('sass/**/*.scss')
        .pipe(sass())
        //.pipe(gulp.dest('css'))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./css/'));
});




