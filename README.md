# grunt-importer

> Importer adds an #import statement to JavaScript based languages including CoffeeScript that works like #include in C-based languages. It concatenates them together in the places you've defined.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-importer --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-importer');
```

## The "importer" task

### Overview
In your project's Gruntfile, add a section named `importer` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  importer: {
    scripts: {
      files: [{
        expand: true,
        src: 'scripts/layout.template.js',
        rename: function (dest, src) {
          return (dest || '') + src.replace('.template.js', '.js');
        }
      }]
    },
  },
})
```

### Usage Examples

#### Replace a Single File
In this example the script would be replaced in-place with any import statements substituted for their references.

```js
grunt.initConfig({
  importer: {
    scripts: {
      files: [{ src: 'tmp/replace_single_file/foo.js' }]
    }
  },
})
```

#### Output to Different Folder and Rename
In this example the dynamic file expanding object is used to output the results to a different folder using a different file name:

```js
grunt.initConfig({
  importer: {
    scripts: {
      files: [{
	    expand: true,
	    flatten: true,
        src: 'test/fixtures/foo.template.js',
        dest: 'tmp/different_output_folder_and_rename/',
        rename: function (dest, src) {
          return (dest || '') + src.replace('.template.js', '.js');
        }
	  }]
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2013-10-04   v1.0.0   Initial release
