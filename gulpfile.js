'use strict';

var lr = require('tiny-lr'),
    gulp = require('gulp'),
    refresh = require('gulp-livereload'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    exec = require('gulp-exec'),
    imagemin = require('gulp-imagemin'),
    server = lr();

gulp.task('sass', function () {
  gulp.src('./public/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function () {
  server.listen(35729, function (err) {
    if (err) return console.log(err);

    gulp.watch('./public/*', function (e) {
      gulp.run('sass');
    });
  });
});

gulp.task('lint', function () {
  gulp.src('*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('start', function () {
  exec('forever instance.js');
});

gulp.task('minify', function () {
  gulp.src('./public/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});