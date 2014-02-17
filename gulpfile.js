'use strict';

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  imagemin = require('gulp-imagemin'),
  minifyCSS = require('gulp-minify-css'),
  uglify = require('gulp-uglify');

if (!process.env.NODE_ENV == 'production') {
  var lr = require('tiny-lr'),
    exec = require('exec'),
    ngrok = require('ngrok'),
    refresh = require('gulp-livereload'),
    jshint = require('gulp-jshint'),
    nodemon = require('gulp-nodemon'),
    plato = require('gulp-plato'),
    wait = require('gulp-wait'),
    open = require('gulp-open'),
    server = lr();
}

require('gulp-grunt')(gulp);

gulp.task('ngrok', function () {

  if (!gulp.env.ngrok) {
    return;
  }

  ngrok.connect({
    authtoken: 'FmbBlphL9x7PdMuMVZj7',
    subdomain: 'brian',
    port: 5000
  }, function (err, url) {

    console.log('//-----  ' + url + '  ------//');

    exec(['open', url], function (err, out, code) {
      if (err) throw err;
      process.stdout.write(out);
      return url;
    });

  });

});

gulp.task('sass', function () {
  gulp.src('./public/scss/*.scss')
    .pipe(sass({
      includePaths: [
        'public/scss/partials',
        'public/vendor/bourbon/app/assets/stylesheets'
      ]
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('dev', ['grunt-bower'], function () {

  gulp.src('./index.js')
    .pipe(nodemon());

  gulp.run('sass');
  gulp.run('ngrok');

  server.listen(35729, function (err) {

    if (err) return console.log(err);

    gulp.watch(['./public/scss/*', './public/scss/partials/*'], function (e) {
      gulp.run('sass');
    });

    gulp.watch(['./app/views/**/*.html', './public/css/**/*', './public/js/**/*'], function (e) {
      gulp.src(e.path)
        .pipe(refresh(server));
    });

    gulp.watch(['./app/controllers/**/*.js'], function (e) {
      gulp.src(e.path)
        .pipe(wait({
          duration: 2000,
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
    .pipe(gulp.dest('public/dist/img'));
});

gulp.task('uglify', function () {
  gulp.src('./public/js/**/*')
    .pipe(uglify())
    .pipe(gulp.dest('public/dist/js'));
});

gulp.task('cssmin', ['sass'], function () {
  gulp.src('./public/css/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('public/dist/css'));
});

gulp.task('minify', function () {
  //gulp.run('imagemin');
  gulp.run('uglify');
  gulp.run('cssmin');
});

gulp.task('dist', function () {
  gulp.run('grunt-bower');
  gulp.run('minify');
});

gulp.task('default', function () {
  gulp.run('dev');
});

gulp.task('start', function () {
  gulp.src('./index.js')
    .pipe(nodemon());
});

gulp.task('review', function () {
  gulp.src('./app/**/*.js')
    .pipe(plato('report'));

  gulp.src('report/index.html')
    .pipe(open());
});

gulp.task('test', ['start'], function () {
  gulp.run('grunt-casperjs', function () {
    process.exit();
  });
});
