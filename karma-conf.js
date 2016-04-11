
module.exports = function(config){

    var configuration = {
        // other things
        frameworks: ['jasmine'],
        singleRun: false,
        autoWatch: true,
        browsers: ['PhantomJS'],
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

    if (process.env.USER === 'pancho111203') {
        configuration.browsers = ['Chrome'];
    }

    config.set(configuration);
};
