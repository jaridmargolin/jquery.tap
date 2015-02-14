module.exports = function(grunt) {
    'use strict';
    
    var tag = grunt.option('tag');

    // If tag is not defined, use the current tag (found in package.json)
    if (!tag) {
        tag = grunt.file.readJSON('package.json').version;
    }

    // -- Plugins --------------------------------------------------------------

    // Intelligently autoloads `grunt-*` plugins from the package dependencies.
    require('load-grunt-tasks')(grunt);

    // Adds better support for defining options.
    require('nopt-grunt')(grunt);

    // -- Configuration --------------------------------------------------------

    grunt.initConfig({

        // Watch for file changes
        watch: {
            scripts: {
                files: [
                    './jquery.tap.js',
                    './Gruntfile.js'
                ],
                tasks: ['build']
            }
        },

        // Compress plugin
        uglify: {
            minify: {
                files: {
                    './jquery.tap.min.js': ['./jquery.tap.js']
                }
            }
        },

        // Copy files over to the gh-pages branch and push them.
        'gh-pages': {
            options: {
                add: true,
                clone: './.grunt',
                branch: 'gh-pages',
                base: './'
            },
            'gh-pages': {
                src: [
                    'jquery.tap.js',
                    '.gitignore',
                    'index.html'
                ]
            }
        },

        // Remove temporary files
        clean: {
            'gh-pages': {
                src: ['./.grunt']
            },
            markdown: {
                src: './index.html'
            }
        },

        // Generate github page
        markdown: {
            'gh-pages': {
                files: [
                    {
                        src: './README.md',
                        dest: './index.html'
                    }
                ],
                options: {
                    template: './markdown.template',
                    templateContext: {
                        version: tag
                    },
                    markdownOptions: {
                        highlight: 'manual',
                        gfm: true
                    }
                }
            }
        },

        // commit new version
        gitcommit: {
            publish: {
                options: {
                    message: 'Version bump to v' + tag
                }
            }
        },

        // tag new version
        gittag: {
            publish: {
                options: {
                    tag: tag
                }
            }
        },

        // push changes (including tags) to origin
        gitpush: {
            publish: {
                options: {
                    remote: 'origin',
                    tags: true
                }
            }
        },

        // Update json files with the tag
        modify_json: {
            options: {
                fields: {
                    version: tag
                }
            },
            plugin: {
                src: 'tap.jquery.json'
            },
            package: {
                src:  'package.json'
            }
        }

    });

    // -- Tasks ----------------------------------------------------------------

    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', ['uglify']);
    grunt.registerTask('cleanup', ['clean:markdown', 'clean:gh-pages']);

    grunt.registerTask('gh', ['cleanup', 'markdown:gh-pages', 'gh-pages', 'cleanup']);
    grunt.registerTask('publish', ['build', 'modify_json', 'gitcommit:publish', 'gh', 'gittag:publish', 'gitpush:publish']);

};
