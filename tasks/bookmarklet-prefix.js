module.exports = function(grunt) {
  'use strict';
  grunt.registerTask('bookmarkletPrefix','prefixes javascript with "javascript:" url tag.', function(){
    var config = grunt.config.get('bookmarkletPrefix');

    var fs = require('fs');

    read(config.src, function(file){
      write(config.dest, prefix(file));
    });

    // reads file at source location
    function read (location, callback) {
      fs.readFile (location,'utf8',function(err,file) {
        if (err) grunt.log.error('failed to read '+config.src);
        callback(file);
      });
    }

    // prefixes the javascript url tag
    function prefix (file) {
      return 'javascript: ' + file;
    }

    // writes file to given location
    function write(location,file) {
      fs.writeFile (location, file, function(err){
        if (err) grunt.log.error('failed to write to '+config.dest);
      });
    }
  });
}
