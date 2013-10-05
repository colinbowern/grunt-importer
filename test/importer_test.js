'use strict';

var grunt = require('grunt');

exports.importer = {
    replace_single_file: function (test) {
        test.expect(1);

        var actualCode = grunt.file.read('tmp/replace_single_file/foo.js').replace(/(?:\r|\n)+/g, "");
        var expectedCode = grunt.file.read('test/expected/foo.js').replace(/(?:\r|\n)+/g, "");
        test.equal(actualCode, expectedCode, 'source file contents match expected results.');

        test.done();
    },
    replace_multiple_files: function (test) {
        test.expect(2);

        var actual, expected;
        actual = grunt.file.read('tmp/replace_multiple_files/foo.js').replace(/(?:\r|\n)+/g, "");
        expected = grunt.file.read('test/expected/foo.js').replace(/(?:\r|\n)+/g, "");
        test.equal(actual, expected, 'source file contents match expected results.');

        actual = grunt.file.read('tmp/replace_multiple_files/footoo.js').replace(/(?:\r|\n)+/g, "");
        expected = grunt.file.read('test/expected/footoo.js').replace(/(?:\r|\n)+/g, "");
        test.equal(actual, expected, 'source file contents match expected results.');

        test.done();
    },
    rename_file: function (test) {
        test.expect(1);

        var actualCode = grunt.file.read('tmp/rename_file/foo.js').replace(/(?:\r|\n)+/g, "");
        var expectedCode = grunt.file.read('test/expected/foo.js').replace(/(?:\r|\n)+/g, "");
        test.equal(actualCode, expectedCode, 'source file contents match expected results.');

        test.done();
    },
    different_output_folder: function (test) {
        test.expect(1);

        var actualCode = grunt.file.read('tmp/different_output_folder/foo.js').replace(/(?:\r|\n)+/g, "");
        var expectedCode = grunt.file.read('test/expected/foo.js').replace(/(?:\r|\n)+/g, "");
        test.equal(actualCode, expectedCode, 'source file contents match expected results.');

        test.done();
    },
    different_output_folder_and_rename: function (test) {
        test.expect(1);

        var actualCode = grunt.file.read('tmp/different_output_folder_and_rename/foo.js').replace(/(?:\r|\n)+/g, "");
        var expectedCode = grunt.file.read('test/expected/foo.js').replace(/(?:\r|\n)+/g, "");
        test.equal(actualCode, expectedCode, 'source file contents match expected results.');

        test.done();
    }
};
