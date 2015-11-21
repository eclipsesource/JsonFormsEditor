module.exports = function(grunt) {

    // import the build.config.js file: all attributes in it are later usable in the task configuration.
    var buildConfig = require('./build.config.js');

    // task configuration.
    var taskConfig = {
        pkg: grunt.file.readJSON('package.json'),

        // Convert Typescript to ES5
        typescript: {
            build: {
                src: '<%= app_files.ts %>',
                dest: '<%= temp_dir %>/ts',
                options: {
                    module: 'commonjs',
                    target: 'es5',
                    sourceMap: false,
                    declaration: false
                }
            },
            test: {
                src: ['<%= app_files.ts %>', '<%= app_files.tsunit %>'],
                dest: '<%= temp_dir %>/ts',
                options: {
                    module: 'commonjs',
                    target: 'es5',
                    sourceMap: false,
                    declarations: false
                }
            }
        },

        // Concat all generated Javascript files
        concat: {
            options: {
                // Remove all existing banners
                stripBanners: true,

                // Replace all 'use strict' statements in the code with a single one at the top
                process: function (src, filepath) {
                    return '// Source: ' + filepath + '\n' +
                        src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                },

                // Add new banner on top of generated file
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> Copyright (c) */ \n' +
                "'use strict';\n"
            },
            "app": {
                src: [
                    '<%= temp_dir %>/ts/**/*.module.js',
                    '<%= temp_dir %>/ts/**/*.js'
                ],
                filter: 'isFile',
                dest: '<%= build_dir %>/js/app.js'
            },
            "lib-js": {
                src: '<%= vendor_files.js %>',
                filter: 'isFile',
                dest: '<%= build_dir %>/js/lib.js'
            },
            "lib-css": {
                src: '<%= vendor_files.css %>',
                filter: 'isFile',
                dest: '<%= build_dir %>/css/lib.css'
            }
        },

        copy: {
            resources: {
                files: [
                    {src: ['<%= app_files.resources %>'], dest: '<%= build_dir %>/resources'}
                ]
            }
        },

        //Config for embedding templates in angular module
        ngtemplates: {
            build: {
                src: '<%= app_files.html %>',
                dest: '<%= build_dir %>/js/templates.js',
                options: {
                    htmlmin: {collapseWhitespace: true, collapseBooleanAttributes: true},
                    module: "app"
                }
            }
        },

        less: {
            build: {
                files: {
                    '<%= build_dir %>/css/style.css': '<%= app_files.less %>'
                }
            }
        },

        index: {
            options: {
                src: 'app/index.html'
            },
            build: {
                dir: '<%= build_dir %>',
                src: [
                    '<%= build_dir %>/js/lib.js',
                    '<%= build_dir %>/js/app.js',
                    '<%= build_dir %>/js/templates.js',
                    '<%= build_dir %>/css/*.css'
                ]
            }
        },

        watch: {
            ts: {
                files: 'app/**/*.ts',
                tasks: ['typescript:build', 'concat:app', 'index:build']
            },
            less: {
                files: 'app/**/*.less',
                tasks: ['less:build', 'index:build']
            },
            html: {
                files: 'app/**/*.html',
                tasks: ['ngtemplates:build', 'index:build']
            }
        },

        clean: {
            build: ['<%= build_dir %>'],
            temp: ['<%= temp_dir %>'],
            lib: ["node_modules", "app/assets/libs"]
        },

        connect: {
            server: {
                options: {
                    port: 1234,
                    base: ['<%= build_dir %>', '<%= build_dir %>/resources']
                }
            }
        },

        karma: {
            unit: {
                options: {
                    frameworks: ['jasmine'],
                    singleRun: true,
                    browsers: ['PhantomJS'],
                    files: [
                        '<%= vendor_files.js %>',
                        '<%= vendor_files.test %>',
                        '<%= temp_dir %>/ts/**/*.module.js',
                        '<%= temp_dir %>/ts/**/*.js'
                    ]
                }
            }
        }


    };

    // load all grunt-tasks
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-index-html-template');
    grunt.loadNpmTasks('grunt-angular-builder');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-karma');

    // Initialize the config and add the build configuration file
    grunt.initConfig(grunt.util._.extend(taskConfig, buildConfig));

    /**
     * The basic build task builds the typescript, copys any javascript source files, compiles the less to css, #
     * adds all html template files to the template cache, concats all library files and builds the new index file.
     */
    grunt.registerTask('build', [
        'clean:build',
        'typescript:build',
        'copy',
        'concat',
        'ngtemplates:build',
        'less:build',
        'index:build',
        'clean:temp'
    ]);

    /**
     * Development task, which builds all sources and then starts a watch task.
     */
    grunt.registerTask('dev', [
        'build',
        'connect',
        'watch'
    ]);

    grunt.registerTask('test', [
        'clean:temp',
        'typescript:test',
        'karma',
        'clean:temp'
    ]);

    /**
     * Register the development task as default task.
     */
    grunt.registerTask('default', [
        'dev'
    ]);

    /**
     * The index.html template includes the stylesheet and javascript sources
     * based on dynamic names calculated in this Gruntfile. This task assembles
     * the list into variables for the template to use and then runs the
     * compilation.
     */
    grunt.registerMultiTask( 'index', 'Process index.html template', function () {
        var dirRE = new RegExp( '^('+buildConfig.build_dir+')\/', 'g' );
        var jsFiles = this.filesSrc.filter(function(file) {
            return file.match(/\.js$/);
        }).map( function ( file ) {
            return file.replace( dirRE, '' );
        });
        var cssFiles = this.filesSrc.filter(function(file){
            return file.match(/\.css$/);
        }).map( function ( file ) {
            return file.replace( dirRE, '' );
        });

        grunt.file.copy('app/index.html', buildConfig.build_dir + '/index.html', {
            process: function ( contents, path ) {
                return grunt.template.process( contents, {
                    data: {
                        scripts: jsFiles,
                        styles: cssFiles,
                        version: grunt.config( 'pkg.version' )
                    }
                });
            }
        });
    });
};