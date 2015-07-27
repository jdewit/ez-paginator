'use_strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: [],
        commit: true,
        push: false,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json', 'bower.json']
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      src: {
        files: {
          src: ['src/**/*.js']
        },
      }
    },
    less: {
      options: {
        compress: true
      },
      styles: {
        files: {
          'dist/ez-paginator.min.css': ['src/less/*.less']
        }
      }
    },
		ngtemplates: {
		  ezPaginator: {
        src:      'src/**/*.html',
        dest:     'dist/ez-paginator-tpl.js',
        options: {
          module: 'ez.paginator',
          url: function(url) { return url.replace('src/js', 'ez_paginator'); },
          htmlmin: {
            collapseBooleanAttributes:      true,
            collapseWhitespace:             true,
            removeComments:                 true,
            removeEmptyAttributes:          true,
            removeRedundantAttributes:      true,
            removeScriptTypeAttributes:     true,
            removeStyleLinkTypeAttributes:  true
          }
        }
      }
		},
    uglify: {
      dev: {
        options: {
          mangle: false,
          compress: false,
          beautify: true
        },
        files: {
          'dist/ez-paginator.js': ['src/js/pre.js', 'src/js/**/*.js'],
        }
      },
      dist: {
        files: {
          'dist/ez-paginator.min.js': ['dist/ez-paginator.js'],
          'dist/ez-paginator-tpl.js': ['dist/ez-paginator-tpl.min.js'],
        }
      }
    },
    watch: {
      dev: {
        files: ['src/**/*'],
        tasks: ['default']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask('default', ['jshint', 'uglify', 'ngtemplates', 'less']);

};
