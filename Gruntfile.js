module.exports = function (grunt) {

  'use strict';

  grunt.initConfig({
    casperjs: {
      options: {
        async: {
          parallel: false
        }
      },
      files: ['tests/*.js']
    },
    bower: {
      dev: {
        dest: 'dest/path'
      }
    }
  });

  grunt.loadNpmTasks('grunt-casperjs');
  grunt.loadNpmTasks('grunt-bower-cli');

};