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
        src: ['less/bs/bootstrap.less','less/styles.less'],
        dest: 'css/styles.css'
      },
      min: {
        options: {
          compress: true,
          cleancss: true,
          report: 'min'
        },
        src: ['less/bs/bootstrap.less','less/styles.less'],
        dest: 'css/styles.min.css'
      }
    },

    copy: {
      fonts: {
        expand: true,
        src: ["fonts/*"],
        dest: 'dist/'
      }
    },

    connect: {
      server: {
        options: {
          port: 3000,
          base: '.'
        }
      }
    },

    validation: {
      options: {
        reset: true,
        relaxerror: [
            "Bad value X-UA-Compatible for attribute http-equiv on element meta.",
            "Element img is missing required attribute src."
        ]
      },
      files: {
        src: ["index.html"]
      }
    },

    watch: {
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src']
      },

      less: {
        files: 'less/**/*.less',
        tasks: ['less:dev']
      }
    }
  });


  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('browserstack-runner');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html-validation');

  // Docs HTML validation task
  grunt.registerTask('validate-html', ['validation']);

  // Test task.
  // var testSubtasks = ['dist-css', 'jshint', 'validate-html'];
  // Only run BrowserStack tests under Travis
  // if (process.env.TRAVIS) {
    // Only run BrowserStack tests if this is a mainline commit in twbs/bootstrap, or you have your own BrowserStack key
    // if ((process.env.TRAVIS_REPO_SLUG === 'twbs/bootstrap' && process.env.TRAVIS_PULL_REQUEST === 'false') || process.env.TWBS_HAVE_OWN_BROWSERSTACK_KEY) {
      // testSubtasks.push('browserstack_runner');
    // }
  // }
  // grunt.registerTask('test', testSubtasks);

  // JS distribution task.
  grunt.registerTask('dist-js', ['concat', 'uglify']);

  // CSS distribution task.
  grunt.registerTask('dist-css', ['recess']);

  // Fonts distribution task.
  grunt.registerTask('dist-fonts', ['copy']);

  // Full distribution task.
  grunt.registerTask('dist', ['clean', 'dist-css', 'dist-fonts', 'dist-js']);

  // Default task.
  grunt.registerTask('default', ['dist', 'build-customizer']);

  // task for building customizer
  grunt.registerTask('build-customizer', 'Add scripts/less files to customizer.', function () {
    var fs = require('fs')

    function getFiles(type) {
      var files = {}
      fs.readdirSync(type)
        .filter(function (path) {
          return type == 'fonts' ? true : new RegExp('\\.' + type + '$').test(path)
        })
        .forEach(function (path) {
          var fullPath = type + '/' + path
          return files[path] = (type == 'fonts' ? btoa(fs.readFileSync(fullPath)) : fs.readFileSync(fullPath, 'utf8'))
        })
      return 'var __' + type + ' = ' + JSON.stringify(files) + '\n'
    }

    var files = getFiles('js') + getFiles('less') + getFiles('fonts')
    fs.writeFileSync('docs-assets/js/raw-files.js', files)
  });
};
