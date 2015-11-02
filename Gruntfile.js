module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Convert Typescript to ES5
        typescript: {
            dist: {
                src: ['app/**/*.ts'],
                options: {
                    module: 'commonjs',
                    target: 'es5',
                    sourcemap: true,
                    declaration: false
                }
            },
            test: {
                src: ['e2e-tests/**/*.ts'],
                options: {
                    module: 'commonjs',
                    target: 'es5'
                }
            }
        },

        // Concat all generated Javascript files
        concat: {
            options: {
                // Remove all existing banners
                stripBanners: true,

                // Replace all 'use strict' statements in the code with a single one at the top
                process: function(src, filepath) {
                    return '// Source: ' + filepath + '\n' +
                        src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                },

                // Add new banner on top of generated file
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> Copyright (c) EclipseSource Muenchen GmbH and others. */ \n' +
                "'use strict';\n"
            },
            dist: {
                // Concat all javascript source files
                src: ['app/src/app.module.js', 'app/src/app.config.js', 'app/src/tree/tree.module.js', 'app/src/tree/tree.config.js', 'app/src/tree/tree.controller.js'],
                filter: 'isFile',
                dest: 'temp/js/<%= pkg.name %>.js'
            },
            "lib-js": {
                src: ['bower_components/angular/angular.js','bower_components/angular-loader/angular-loader.js','bower_components/angular-route/angular-route.js'],
                filter: 'isFile',
                dest: 'temp/js/lib.js'
            },
            "lib-css": {
                src: ['bower_components/**/*.css'],
                filter: 'isFile',
                dest: 'temp/css/lib.css'
            }

        },

        // Config for Uglify (= Minify) Task
        uglify: {
            dist: {
                src: 'temp/js/<%= pkg.name %>.js',
                dest: 'dist/js/<%= pkg.name %>.min.js'
            },
            lib: {
                src: 'temp/js/lib.js',
                dest: 'dist/js/lib.min.js'
            },
            templates: {
                src: 'temp/templates.js',
                dest: 'dist/js/templates.min.js'
            }
        },

        //Config for embedding templates in angular module
        ngtemplates: {
            dist: {
                src: 'app/**/*.html',
                dest: 'temp/templates.js',
                options: {
                    htmlmin: {collapseWhitespace: true, collapseBooleanAttributes: true},
                    module: "app"
                }
            }
        },

        less: {
            build: {
                files: {
                    'dist/css/style.css': 'app/common/style.less'
                }
            },
            compile: {
                files: {
                    'dist/css/style.css': 'app/common/style.less'
                },
                options: {
                    cleancss: true,
                    compress: true
                }
            }
        },

        index: {
            options: {
                src: 'app/index.html'
            },
            build: {
                dir: 'dist',
                src: [
                    "dist/js/lib.min.js",
                    "dist/js/<%= pkg.name %>.min.js",
                    "dist/js/templates.min.js",
                    "dist/css/*.css"
                ]
            }
        },

        // Config for Jshint Task
        jshint: {
            beforeconcat: ['app/**', '!app/bower_components'],
            afterconcat: ['dist/<%= pkg.name %>.js'],
            options: { jshintrc: '.jshintrc' }
        },

        watch: {
            js: {
                files: 'app/**/*.ts',
                tasks: ['typescript:dist', 'concat:dist', 'uglify:dist']
            },
            html: {
                files: 'app/**/*.html',
                tasks: ['ngtemplates']
            }
        },

        clean: {
            dist: ["dist/**", "temp/**"],
            temp: ["temp"],
            all: ["dist", "temp", "node_modules", "app/bower_components"]
        }
    });

    // inline templates into template.js
    grunt.loadNpmTasks('grunt-angular-templates');

    // Load the plugin that provides the "concat" task.
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-contrib-jshint');

    // clean
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-typescript');

    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.loadNpmTasks('grunt-index-html-template');

    // Build distribution
    grunt.registerTask('dist', [
        "clean:dist",
        'typescript:dist',
        'ngtemplates:dist',
        'less',
        'concat:dist',
        'concat:lib-js',
        'concat:lib-css',
        'uglify:dist',
        'uglify:lib',
        'uglify:templates',
        'index:build',
        //'clean:temp'
    ]);

    grunt.registerTask('dev', [
        'dist',
        'watch'
    ]);

    // Build distribution as default
    grunt.registerTask('default', [
        'dist'
    ]);

    /**
     * The index.html template includes the stylesheet and javascript sources
     * based on dynamic names calculated in this Gruntfile. This task assembles
     * the list into variables for the template to use and then runs the
     * compilation.
     */
    grunt.registerMultiTask( 'index', 'Process index.html template', function () {
        var dirRE = new RegExp( '^(dist)\/', 'g' );
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

        grunt.file.copy('app/index.html', 'dist/index.html', {
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