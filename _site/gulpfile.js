// core
var url = require('url');

// npm
var gulp = require('gulp');
var concat = require('gulp-concat');
var autoprefixer = require('autoprefixer');
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var minify = require('gulp-minify');
var cleanCSS = require('gulp-clean-css');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var proxy = require('http-proxy-middleware');
//var proxyOptions = url.parse('http://localhost:5984/api/session');
//proxyOptions.route = '/api/session';

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

// location /api/session {
//   proxy_pass http://localhost:5984/_session;
//   proxy_redirect off;
//   proxy_set_header Host $host;
//   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
// }
//
// # And so is this - adapt port to your setup
// #location /api/users/ {
//   #proxy_pass http://localhost:5984/_users/;
//   #proxy_redirect off;
//   #proxy_set_header Host $host;
//   #proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
// #}
// location /api/users/ {
//   rewrite ^/api/users/([^/]+)$ /_users/org.couchdb.user:$1 break;
//   proxy_pass http://localhost:5984;
//   proxy_redirect off;
//   proxy_set_header Host $host;
//   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
// }
//
// location /api/users {
//   proxy_pass http://localhost:5984/_users;
//   proxy_redirect ~^(https*://)(.+)/_users/org.couchdb.user:(.+)$ $1$2/api/users/$3;
//   proxy_set_header Host $host;
//   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
// }

gulp.task('browser-sync', function() {
    var proxyOptionsSession = {
        target: 'http://localhost:5984',
        pathRewrite: {
            '^/api/session': '/_session'
        }
    }

    var proxyOptionsUsers = {
        target: 'http://localhost:5984',
        pathRewrite: function (path, req) {
            return path === '/api/users' ? '/_users' : path.replace(/^\/api\/users\//, '/_users/org.couchdb.user:')
        }
    }
    browserSync({
        open: true,
        port: 3000,
        server: {
            baseDir: "./target/",
            middleware: [
                proxy('/api/session', proxyOptionsSession),
                proxy('/api/users', proxyOptionsUsers)
            ]
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
