'use strict';

var lr = require('tiny-lr'),
    gulp = require('gulp'),
    refresh = require('gulp-livereload'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    imagemin = require('gulp-imagemin'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    nodemon = require('gulp-nodemon'),
    wait = require('gulp-wait'),
    server = lr();

require('gulp-grunt')(gulp);

gulp.task('sass', function () {
  gulp.src('./public/scss/*.scss')
    .pipe(sass({
      includePaths: [
        'public/scss/partials'
      ]
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('dev', function () {

  gulp.src('./instance.js')
    .pipe(nodemon());

  gulp.run('sass');

  server.listen(35729, function (err) {
    if (err) return console.log(err);

    gulp.watch(['./public/scss/*', './public/scss/partials/*'], function (e) {
      gulp.run('sass');
    });

    gulp.watch(['./public/js/**/*', './public/css/**/*'], function (e) {
      gulp.src(e.path)
        .pipe(refresh(server));
    });

    gulp.watch('./app/views/**/*.html', function (e) {
      gulp.src(e.path)
        .pipe(wait({
          duration: 1500,
          verbose: true
        }))
        .pipe(refresh(server));
    });

  });

});

gulp.task('lint', function () {
  gulp.src('*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('imagemin', function () {
  gulp.src('./public/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

gulp.task('uglify', function() {
  gulp.src('./public/js/**/*')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('cssmin', function () {
  gulp.src('./public/css/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('minify', function () {
  gulp.run('imagemin');
  gulp.run('uglify');
  gulp.run('cssmin');
});

gulp.task('default', function () {
  gulp.run('dev');
});