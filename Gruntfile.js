/* jshint node: true */

module.exports = function(grunt) {
  "use strict";

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // var btoa = require('btoa')
  // Project configuration.
  grunt.initConfig({

    creds: grunt.file.readJSON('server_creds.json'),
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['js/**/*.js']
      }
    },

    uglify: {
      options: {
        report: 'min'
      }
    },

    less: {
      dev: {
        options: {
          dumpLineNumbers: 'comments'
        },
        src: ['less/styles.less'],
        dest: 'css/styles.css'
      }
    },

    uncss: {
      options: {
        compress: true,
        ignore: '.item'
      },
      dist: {
        files: {
          'css/styles.min.css': 'index.html'
        }
      }
    },

    watch: {
      less: {
        files: 'less/**/*.less',
        tasks: ['less:dev']
      },

      livereload: {
        options: { livereload: true },
        files: ['css/styles.css', 'index.html']
      }
    },

    rsync: {
    options: {
        src: ".",
        args: ["--verbose"],
        exclude: ['.git*', 'node_modules', '.sass-cache', 'Gruntfile.js', 'package.json', '.DS_Store', 'README.md', 'config.rb', '.jshintrc', 'server_creds.json'],
        recursive: true,
        syncDestIgnoreExcl: true
    },
    staging: {
        options: {
            dest: "/var/www/labs.alexdmejias.com/cdnatives/",
            host: "<%= creds.user %>@<%= creds.ip %>"
        }
    }
}
  });

  // JS distribution task.
  grunt.registerTask('mincss', ['uncss']);

};
