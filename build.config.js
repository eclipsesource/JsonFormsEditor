/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
    /**
     * The `build_dir` folder is where the project is compiled for development
     */
    build_dir: 'build',

    /**
     * This is a collection of file patterns that refer to the app. These file paths are used in
     * the configuration of build tasks. `js` is all project javascript, except the tests.
     * 'jsunit' are all unit tests. `html` are all the HTML files, `less` are the stylesheets.
     */
    app_files: {
        ts: [
            'app/src/app.module.ts',
            'app/src/tree/tree.module.ts',
            'app/src/tree/tree.config.ts',
            'app/src/tree/tree.service.ts',
            'app/src/tree/tree.controller.ts',
            'app/src/tree/tree.service.ts',
            'app/src/tree/model/treeElements.ts',
            'app/src/detail/detail.module.ts',
            'app/src/detail/detail.config.ts',
            'app/src/detail/detail.controller.ts'
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
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/angular-ui-tree/dist/angular-ui-tree.js',
            'bower_components/jquery/dist/jquery.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'bower_components/angular-ui-grid/ui-grid.js',
            'bower_components/angular-ui-validate/dist/validate.js',
            'bower_components/lodash-compat/lodash.js',
            'bower_components/path-loader/browser/path-loader.js',
            'bower_components/traverse/traverse.js',
            'bower_components/json-refs/browser/json-refs.js',
            'bower_components/tv4/tv4.js',
            'bower_components/jsonforms/dist/js/jsonforms.js'

        ],
        css: [
            'bower_components/angular-ui-tree/dist/angular-ui-tree.min.css',
            'bower_components/bootstrap/dist/css/bootstrap.css',
            'bower_components/bootstrap/dist/css/bootstrap-theme.css'
        ],
        assets: [
        ]
    }
};
