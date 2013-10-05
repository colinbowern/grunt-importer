/*
 * grunt-importer
 * https://github.com/colinbowern/grunt-importer
 *
 * Copyright (c) 2013 Colin Bowern
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    var importer = require('importer'),
        path = require('path'),
        fs = require('fs');

    grunt.registerMultiTask('importer', 'Importer adds an #import statement to JavaScript based languages including CoffeeScript that works like #include in C-based languages. It compiles files into JavaScript, concatenates them together in the places you have defined, and generates source maps.', function () {
        var done = this.async();

        if (this.files.length < 1) {
            grunt.verbose.warn('No source files provided, nothing to do.');
        }

        grunt.util.async.forEachSeries(this.files, function (f, nextFileObj) {
            var destination = f.dest;

            var files = f.src.filter(function (filepath) {
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" was not found.');
                    return false;
                } else {
                    return true;
                }
            });

            if (files.length === 0) {
                if (f.src.length < 1) {
                    grunt.log.warn('No source files found, nothing to do.');
                }
                return nextFileObj();
            }

            grunt.util.async.concatSeries(files, function (file, next) {
                var destinationFile = destination || file;

                var pkg = importer.createPackage(file);
                pkg.build(function(err, changed) {
                    if (!err && changed) {
                        var results = {
                            sourceFile: file,
                            destinationFile: destinationFile,
                            destinationSourceMapFile: pkg.sourceMap,
                            data: changed
                        };
                        next(err, results);
                    } else {
                        nextFileObj(err);
                    }
                });
            }, function (err, results) {
                if (!results) {
                    grunt.log.warn('Destination not written because results were empty.');
                    nextFileObj();
                }
                for(var i = 0; i < results.length; i++) {
                    var result = results[i];

                    grunt.file.write(result.destinationFile, result.data.code);
                    grunt.log.writeln('File "' + result.destinationFile + '" created.');
                }
                nextFileObj();
            });
        }, done);
    });
};