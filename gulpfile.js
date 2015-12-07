var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('autoprefixer');
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');

gulp.task('default',function() {
    gulp.watch('sass/**/*.scss',['sass']);
});

gulp.task('scripts', function() {
  return gulp.src(['./lib/*.js', './js/*.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', function () {
    gulp.src('sass/**/*.scss')
        .pipe(sass())
        //.pipe(gulp.dest('css'))
        .pipe(concat('styles.css'))
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css/'));
});
