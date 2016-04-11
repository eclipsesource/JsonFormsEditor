
module.exports = function(config){
    var files = require("./build.config.js");

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
        },
        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        }
    };

    if (process.env.TRAVIS) {
        configuration.browsers = ['Chrome_travis_ci'];
    }

    config.set(configuration);
};
