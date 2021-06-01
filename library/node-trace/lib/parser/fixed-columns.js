/* jshint -W071 */
'use strict';

var os = require('os');

module.exports = function parserFixedColumns(data, cb) {
    var lines  = _trimNewlines(data).split(os.EOL);
var split_lines;

    cb(null, lines
        .filter(function(line, index) {
            return line && index >= 1;
        })
        .map(function(line) {


split_lines=line.replace(/\s+/g,' ').trim().split(" ");  
          return {
                pid:  split_lines[0],
                name: split_lines[4],
                cpu:  split_lines[3],
                pmem: parseInt(split_lines[1], 10) * 1024,
                vmem: parseInt(split_lines[2], 10) * 1024
            };
  
      }));
};

//
// Trims only newlines (no spaces) at the beginning and end of the string
//
function _trimNewlines(str) {
    return str.replace(/^[\r\n]+|[\r\n]+$/g, '');
}

