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
  });

  grunt.loadNpmTasks('grunt-casperjs');

};