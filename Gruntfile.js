/*
 * grunt-importer
 * https://github.com/colinbowern/grunt-importer
 *
 * Copyright (c) 2013 Colin Bowern
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
              'Gruntfile.js',
              'tasks/*.js',
              '<%= nodeunit.tests %>',
            ],
            options: {
                jshintrc: '.jshintrc',
            },
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp'],
        },

        // Setup for tests
        copy: {
            tests: {
                files: [{
                    expand: true,
                    cwd: 'test/fixtures',
                    src: ['**/*.*', '!**/*.template.js'],
                    dest: 'tmp/replace_single_file'
                },
                {
                    expand: true,
                    cwd: 'test/fixtures',
                    src: ['**/*.*', '!**/*.template.js'],
                    dest: 'tmp/replace_multiple_files'
                },
                {
                    expand: true,
                    cwd: 'test/fixtures',
                    src: ['**/*.*', '!foo.js'],
                    dest: 'tmp/rename_file'
                }]
            }
        },

        // Configurations to be tested
        importer: {
            replace_single_file: {
                files: [{ src: 'tmp/replace_single_file/foo.js' }]
            },
            replace_multiple_files: {
                files: [{ src: 'tmp/replace_multiple_files/*.js' }]
            },
            rename_file: {
                files: [{
                    expand: true,
                    src: 'tmp/rename_file/foo.template.js',
                    rename: function (dest, src) {
                        return (dest || '') + src.replace('.template.js', '.js');
                    }
                }]
            },
            different_output_folder: {
                files : [{
                    expand: true,
                    flatten: true,
                    src: 'test/fixtures/foo.js',
                    dest: 'tmp/different_output_folder/'
                }]
            },
            different_output_folder_and_rename: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: 'test/fixtures/foo.template.js',
                    dest: 'tmp/different_output_folder_and_rename/',
                    rename: function (dest, src) {
                        return (dest || '') + src.replace('.template.js', '.js');
                    }
                }]
            }
        },

        // Unit tests
        nodeunit: {
            tests: ['test/*_test.js'],
        },

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'copy', 'importer', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
