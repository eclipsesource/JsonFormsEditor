module.exports = function (grunt) {

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
                    '<%= temp_dir %>/ts/shared/**/*.js',
                    '<%= temp_dir %>/ts/components/core/elementsConfig/*.js',
                    '<%= temp_dir %>/ts/components/core/model/*.js',
                    '<%= temp_dir %>/ts/components/**/*.js',
                    '<%= temp_dir %>/ts/app.config.js',
                    '<%= temp_dir %>/ts/app.run.js'
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

        uglify: {
            dist: {
                src: ['<%= build_dir %>/js/lib.js', '<%= build_dir %>/js/app.js', '<%= build_dir %>/js/templates.js'],
                dest: '<%= dist_dir %>/js/jfe.js'
            }
        },

        copy: {
            assets: {
                files: [
                    {
                        cwd: 'app/assets',
                        src: '<%= app_files.assets %>',
                        dest: '<%= build_dir %>/',
                        filter: 'isFile',
                        expand: true
                    }
                ]
            },

            dist: {
                files: [
                    {
                        cwd: '<%= build_dir %>',
                        src: ['css/**', 'fonts/**', 'resource/**'],
                        dest: '<%= dist_dir %>/',
                        filter: 'isFile',
                        expand: true
                    }
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
            },
            test: {
                src: '<%= app_files.html %>',
                dest: '<%= temp_dir %>/ts/templates.js',
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

        indexBuild: {
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

        indexDist: {
            options: {
                src: 'app/index.html'
            },
            build: {
                dir: '<%= dist_dir %>',
                src: [
                    '<%= dist_dir %>/js/jfe.js',
                    '<%= dist_dir %>/css/*.css'
                ]
            }
        },

        watch: {
            ts: {
                files: 'app/**/*.ts',
                tasks: ['typescript:build', 'concat:app', 'indexBuild']
            },
            less: {
                files: 'app/**/*.less',
                tasks: ['less:build', 'indexBuild']
            },
            html: {
                files: 'app/**/*.html',
                tasks: ['ngtemplates:build', 'indexBuild']
            }
        },

        clean: {
            build: ['<%= build_dir %>'],
            temp: ['<%= temp_dir %>'],
            dist: ['<%= dist_dir %>'],
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
                    singleRun: false,
                    autoWatch: true,
                    browsers: ['Chrome'],
                    files: [
                        '<%= vendor_files.js %>',
                        '<%= vendor_files.test %>',
                        '<%= temp_dir %>/ts/**/*.module.js',
                        '<%= temp_dir %>/ts/shared/**/*.js',
                        '<%= temp_dir %>/ts/components/core/elementsConfig/*.js',
                        '<%= temp_dir %>/ts/components/core/model/*.js',
                        '<%= temp_dir %>/ts/components/**/*.js',
                        '<%= temp_dir %>/ts/app.config.js',
                        '<%= temp_dir %>/ts/app.run.js',
                        '<%= temp_dir %>/ts/**/*.js',

                    ],
                    basePath: ''
                }
            }
        },
        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: ['pkg'],
                commit: true,
                commitMessage: 'Bump version to v%VERSION%',
                commitFiles: ['package.json', 'bower.json'],
                createTag: false,
                push: false,
                globalReplace: false,
                prereleaseName: false,
                metadata: '',
                regExp: false
            }
        },

        gitcheckout: {
            deploy: {
                options: {
                    branch: 'deploy-v<%= pkg.version %>',
                    overwrite: true
                }
            }
        },

        gitcommit: {
            deploy: {
                options: {
                    message: "Release Version v<%= pkg.version %>"
                },
                files: {
                }
            }
        },

        gittag: {
            deploy: {
                options: {
                    tag: 'v<%= pkg.version %>',
                    message: 'Release version v<%= pkg.version %>'
                }
            }
        },

        gitpush: {
            deploy: {
                options: {
                    remote: 'upstream',
                    tags: true
                }
            }
        }
    };

    // load all grunt-tasks
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-index-html-template');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-file-append');
    grunt.loadNpmTasks('grunt-git');

    // Initialize the config and add the build configuration file
    grunt.initConfig(grunt.util._.extend(taskConfig, buildConfig));

    /**
     * The basic build task builds the typescript, copys any javascript source files, compiles the less to css, #
     * adds all html template files to the template cache, concats all library files and builds the new index file.
     */
    grunt.registerTask('build', [
        'clean:build',
        'typescript:build',
        'copy:assets',
        'concat',
        'ngtemplates:build',
        'less:build',
        'indexBuild',
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
        'ngtemplates:test',
        'karma',
        'clean:temp'
    ]);

    grunt.registerTask('dist', [
        'clean:dist',
        'clean:build',
        'typescript:build',
        'copy:assets',
        'concat',
        'ngtemplates:build',
        'less:build',
        'uglify:dist',
        'copy:dist',
        'indexDist',
        'clean:temp',
        'clean:build'
    ]);

    /**
     * Register the development task as default task.
     */
    grunt.registerTask('default', [
        'dev'
    ]);

    grunt.registerTask('deploy', [
        'dist',
        'bump-only:patch',
        'bump-commit',
        'gitcheckout:deploy',
        'gitcommit:deploy',
        'gittag:deploy',
        'gitpush:deploy'
    ]);

    /**
     * The index.html template includes the stylesheet and javascript sources
     * based on dynamic names calculated in this Gruntfile. This task assembles
     * the list into variables for the template to use and then runs the
     * compilation.
     */
    grunt.registerMultiTask('indexBuild', 'Process index.html template', function () {
        var dirRE = new RegExp('^(' + buildConfig.build_dir + ')\/', 'g');
        var jsFiles = this.filesSrc.filter(function (file) {
            return file.match(/\.js$/);
        }).map(function (file) {
            return file.replace(dirRE, '');
        });
        var cssFiles = this.filesSrc.filter(function (file) {
            return file.match(/\.css$/);
        }).map(function (file) {
            return file.replace(dirRE, '');
        });

        grunt.file.copy('app/index.html', buildConfig.build_dir + '/index.html', {
            process: function (contents, path) {
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles,
                        styles: cssFiles,
                        version: grunt.config('pkg.version')
                    }
                });
            }
        });
    });

    grunt.registerMultiTask('indexDist', 'Process index.html template', function () {
        var dirRE = new RegExp('^(' + buildConfig.dist_dir + ')\/', 'g');
        var jsFiles = this.filesSrc.filter(function (file) {
            return file.match(/\.js$/);
        }).map(function (file) {
            return file.replace(dirRE, '');
        });
        var cssFiles = this.filesSrc.filter(function (file) {
            return file.match(/\.css$/);
        }).map(function (file) {
            return file.replace(dirRE, '');
        });

        grunt.file.copy('app/index.html', buildConfig.dist_dir + '/index.html', {
            process: function (contents, path) {
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles,
                        styles: cssFiles,
                        version: grunt.config('pkg.version')
                    }
                });
            }
        });
    });

};
