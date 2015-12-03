module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options:{
        enclose:{
          'window':'window',
          'document':'document',
        },
        mangle: false
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.src %>']
        }
      }
    },
    bookmarkletPrefix: {
      src: 'dist/<%= pkg.name %>.min.js',
      dest:'dist/<%= pkg.name %>.min.js'
    },
    watch: {
      scripts:{
        files: ['<%= concat.dist.src %>'],
        tasks: ['uglify','bookmarkletPrefix'],
        options: {
          nospawn: true
        }
      },
    }
  });
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');


  grunt.registerTask('default', [ 'uglify','bookmarkletPrefix','watch']);

};
