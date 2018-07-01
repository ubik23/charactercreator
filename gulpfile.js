var gulp = require('gulp');
var concat = require('gulp-concat');
var autoprefixer = require('autoprefixer');
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var minify = require('gulp-minify');
var cleanCSS = require('gulp-clean-css');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

gulp.task('default',function() {
    gulp.watch('src/sass/**/*.scss',['sass']);
    gulp.watch('src/js/**/*.js',['scripts']);
    gulp.watch('src/*.html',['copy']);
    browserSync.init({
        server: {
            baseDir: "./target/"
        }
    });
});

gulp.task('copy', function() {
   gulp.src('./src/*.{html, htm}')
   .pipe(gulp.dest('./target'));
})

gulp.task('scripts', function() {
  return gulp.src([
        './bower_components/promise-polyfill/promise.js', './bower_components/fetch/fetch.js', './src/lib/*.js', './src/js/*.js'
  ])
    .pipe(concat('all.js'))
    .pipe(minify({
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('./target/dist/'));
});

gulp.task('sass', function () {
    gulp.src('src/sass/**/*.scss')
        .pipe(sass())
        .pipe(concat('styles.css'))
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./target/css/'));
});
