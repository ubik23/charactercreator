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

gulp.task('default', function () {
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    browserSync.init({
        server: {
            baseDir: "./target/"
        }
    });
});

gulp.task('scripts', function () {
    return gulp.src([
        './node_modules/babel-polyfill/dist/polyfill.js',
        './node_modules/fetch/fetch.js',
        './node_modules/flexi-color-picker/colorpicker.js',
        './node_modules/snapsvg/dist/snap.svg.js',
        './src/lib/*.js',
        './src/js/*.js'
    ])
    .pipe(concat('all.js'))
    .pipe(minify({
        exclude: ['tasks'],
        ignoreFiles: ['-min.js']
    }))
    .pipe(gulp.dest('./target/dist/'));
});

gulp.task('sass', function () {
    gulp.src('src/sass/**/*.scss')
        .pipe(sass())
        .pipe(concat('styles.css'))
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(sourcemaps.write('.'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./target/css/'));
});
