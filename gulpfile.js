'use strict';

var lr = require('tiny-lr'),
    g = require('gulp'),
    refresh = require('gulp-livereload'),
    server = lr();

g.task('less', function () {
  g.src('less/*.less')
    .pipe(less())
    .pipe(g.dest('css'))
    .pipe(refresh(server));
});

g.task('watch', function () {
  server.listen(35729, function (err) {
    if (err) return console.log(err);

    g.watch('less/*.less', function (e) {
        g.run('less');
    });
  });
});