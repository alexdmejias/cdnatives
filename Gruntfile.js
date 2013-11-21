/* jshint node: true */

module.exports = function(grunt) {
  "use strict";

  var btoa = require('btoa')
  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
              ' * Bootstrap v<%= pkg.version %> by @fat and @mdo\n' +
              ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
              ' * Licensed under <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
              ' *\n' +
              ' * Designed and built with all the love in the world by @mdo and @fat.\n' +
              ' */\n\n',
    jqueryCheck: 'if (typeof jQuery === "undefined") { throw new Error("Bootstrap requires jQuery") }\n\n',

    // Task configuration.
    clean: {
      dist: ['dist']
    },

    jshint: {
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['js/**/*.js']
      }
    },

    concat: {
      options: {
        banner: '<%= banner %><%= jqueryCheck %>',
        stripBanners: false
      },
      bootstrap: {
        src: [
          'js/bs/transition.js',
          'js/bs/alert.js',
          'js/bs/button.js',
          'js/bs/carousel.js',
          'js/bs/collapse.js',
          'js/bs/dropdown.js',
          'js/bs/modal.js',
          'js/bs/tooltip.js',
          'js/bs/popover.js',
          'js/bs/scrollspy.js',
          'js/bs/tab.js',
          'js/bs/affix.js',
          'js/vendor/handlebar.js',
          'js/vendor/jquery.js',
          'js/vendor/zeroClipboard.js'

        ],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>',
        report: 'min'
      },
      bootstrap: {
        src: ['<%= concat.bootstrap.dest %>'],
        dest: 'dist/js/<%= pkg.name %>.min.js'
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
      // min: {
      //   options: {
      //     compress: true,
      //     cleancss: true,
      //     report: 'min'
      //   },
      //   src: ['less/styles.less'],
      //   dest: 'css/styles.min.css'
      // }
    },

    growl: {
      less: {
        message: 'less just compiled'
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
        tasks: ['less:dev', 'growl:less']
      },

      livereload: {
        options: { livereload: true },
        files: ['css/styles.css', 'index.html']
      }
    }
  });


  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-growl');

  // JS distribution task.
  grunt.registerTask('dist-js', ['concat', 'uglify']);

};
