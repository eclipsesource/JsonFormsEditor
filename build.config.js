/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
    /**
     * The `build_dir` folder is where the project is compiled for development
     */
    build_dir: 'build',

    /**
     * Temp Directory used during the build and deleted afterwards.
     */
    temp_dir: 'temp',

    /**
     * Distribution Directory, where the project is compiled for production
     */
    dist_dir: 'dist',

    /**
     * This is a collection of file patterns that refer to the app. These file paths are used in
     * the configuration of build tasks. `ts` is all project typescript, except the tests.
     * 'jsunit' are all unit tests. `html` are all the HTML files, `less` are the stylesheets.
     */
    app_files: {
        ts: [ 'app/src/**/*.ts', '!app/src/**/*.spec.ts' ],
        tsunit: [ 'app/src/**/*.spec.ts' ],
        html: [ 'app/index.html', 'app/src/**/*.html' ],
        less: ['app/assets/style/style.less'],
        assets: ['fonts/**/*.*', 'resource/**/*.*']
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
            'app/assets/libs/angular/angular.js',
            'app/assets/libs/angular-ui-router/release/angular-ui-router.js',
            'app/assets/libs/angular-ui-tree/dist/angular-ui-tree.js',
            'app/assets/libs/jquery/dist/jquery.js',
            'app/assets/libs/bootstrap/dist/js/bootstrap.js',
            'app/assets/libs/angular-bootstrap/ui-bootstrap-tpls.js',
            'app/assets/libs/angular-ui-grid/ui-grid.js',
            'app/assets/libs/angular-ui-validate/dist/validate.js',
            'app/assets/libs/lodash-compat/lodash.js',
            'app/assets/libs/path-loader/browser/path-loader.js',
            'app/assets/libs/traverse/traverse.js',
            'app/assets/libs/json-refs/browser/json-refs.js',
            'app/assets/libs/tv4/tv4.js',
            'app/assets/libs/jsonforms/dist/js/jsonforms.js',
            'app/assets/libs/material-design-lite/material.js',
            'app/assets/libs/angular-animate/angular-animate.js',
            'app/assets/libs/angular-aria/angular-aria.js',
            'app/assets/libs/angular-material/angular-material.js'
        ],
        test: [
            'app/assets/libs/angular-mocks/angular-mocks.js'
        ],
        css: [
            'app/assets/libs/angular-ui-tree/dist/angular-ui-tree.min.css',
            'app/assets/libs/bootstrap/dist/css/bootstrap.css',
            'app/assets/libs/bootstrap/dist/css/bootstrap-theme.css',
            'app/assets/libs/material-design-lite/material.css',
            'app/assets/libs/angular-material/angular-material.css'
        ],
        assets: [
        ]
    }
};
