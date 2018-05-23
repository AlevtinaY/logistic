var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');
var notify = require('gulp-notify');
var wait = require('gulp-wait');
var image = require('gulp-image');
var imagemin = require('gulp-imagemin');
 
gulp.task('img-min2', () =>
     gulp.src('./src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/img'))
);

gulp.task('img-min', function () {
  gulp.src('./src/img/**/*')
    .pipe(image({
      pngquant: false,
      optipng: false,
      zopflipng: true,
      jpegRecompress: false,
      jpegoptim: true,
      mozjpeg: true,
      gifsicle: false,
      svgo: true,
      concurrent: 5
    }))
    .pipe(gulp.dest('./build/img'));
});

gulp.task('html-compile', function() {
  gulp.src('./src/*.html')
    .pipe(gulp.dest('./build'))
});

// compile scss to css, add prefixes, minify and concat all css files
gulp.task('sass-compile', function () {

    gulp.src('./src/scss/style.scss')
      .pipe(wait(500))
      .pipe(sass({
          outputStyle: 'expanded'
      }))
      .on('error', sass.logError)
      .pipe(autoprefixer({
          browsers: ['last 2 versions', 'IE >= 9'],
          cascade: false
      }))
      .pipe(concat('main.css'))
      .pipe(gulp.dest('./build/css'))
      .pipe(csso())
      .pipe(concat('main.min.css'))
      .pipe(gulp.dest('./build/css'));
});

// concat and minify js files
gulp.task('js-compile', function() {

    gulp.src(['./src/js/plugins/*.js', './src/js/functions.js', './src/js/main.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./build/js'))
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('./build/js'));
});

// watch for changes in files and cook them
gulp.task('watch', function () {
    gulp.watch('./src/scss/*.scss', ['sass-compile']);
    gulp.watch('./src/*.html', ['html-compile']);
    gulp.watch('./src/js/*.js', ['js-compile']);
    gulp.watch('./src/img/*', ['img-min']);
});

//start local webserver (with `watch` task)
gulp.task('serve', ['watch'], function() {
  gulp.src('build')
    .pipe(webserver({
        port: 8080
    }));
});
