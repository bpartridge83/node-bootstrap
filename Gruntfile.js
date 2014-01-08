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
    nodemon: {
      dev: {
        options: {
          file: 'instance.js',
          nodeArgs: ['--debug']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-casperjs');
  grunt.loadNpmTasks('grunt-nodemon');

};