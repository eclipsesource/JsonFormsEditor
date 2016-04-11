
module.exports = function(config){

    var configuration = {
        // other things
        frameworks: ['jasmine'],
        singleRun: false,
        autoWatch: true,
        browsers: ['Chrome'],
        basePath: '',
        preprocessors: {
            'temp/**/*.js': ['coverage']
        },
        reporters: ['dots', 'coverage'],
        coverageReporter: {
            type: 'lcov',
            dir: 'temp/coverage/'
        }
    };

    if (process.env.TRAVIS) {
        configuration.browsers = ['PhantomJS'];
    }

    config.set(configuration);
};
