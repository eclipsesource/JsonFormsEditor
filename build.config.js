/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
    /**
     * The `build_dir` folder is where the project is compiled for development
     */
    build_dir: 'build',

    /**
     * The 'compile_dir' folder is where the project is compiled for production
     */
    compile_dir: 'bin',

    /**
     * The 'temp_dir' folder is a temporary folder which is used during a build and deleted afterwards
     */
    temp_dir: 'temp',

    /**
     * The 'src_dir' folder is the root for all source files. Needs to correspond to the paths in app_files.ts.
     */

    /**
     * This is a collection of file patterns that refer to the app. These file paths are used in
     * the configuration of build tasks. `js` is all project javascript, except the tests.
     * 'jsunit' are all unit tests. `html` are all the HTML files, `less` are the stylesheets.
     */
    app_files: {
        ts: ['app/src/**/*.ts', '!app/src/**/*.spec.ts', '!app/src/assets/**/*.ts' ],
        js: [
            'app/src/app.module.js',
            'app/src/tree/tree.module.js',
            'app/src/tree/tree.config.js',
            'app/src/tree/tree.controller.js'
        ],
        tsunit: [ 'app/src/**/*.spec.ts' ],
        html: [ 'app/index.html', 'app/src/**/*.html' ],
        less: ['app/common/style.less', 'app/src/**/.less']
    },

    /**
     * This is the same as `app_files`, except it contains patterns that
     * reference library code (`bower_components/`) that need to be placed into the build
     * process somewhere. While the `app_files` property ensures all
     * standardized files are collected for compilation, it is the user's job
     * to ensure non-standardized (i.e. vendor-related) files are handled
     * appropriately in `vendor_files.js`.
     *
     * The `vendor_files.js` property holds files to be automatically
     * concatenated and minified with the project source files.
     *
     * The `vendor_files.css` property holds any CSS files to be automatically
     * included in the app.
     *
     * The `vendor_files.assets` property holds any assets to be copied along
     * with the app's assets. This structure is flattened, so it is not
     * recommended to use wildcards.
     */
    vendor_files: {
        js: [
            'bower_components/angular/angular.js',
            'bower_components/angular-loader/angular-loader.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js'
        ],
        css: [

        ],
        assets: [
        ]
    }
};
