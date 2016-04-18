
module.exports = function(config){

    var configuration = {
        // other things
        frameworks: ['jasmine'],
        singleRun: true,
        autoWatch: false,
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

    /*if (process.env.USER === 'pancho111203' || process.env.USER === 'hector') {
        configuration.browsers = ['Chrome'];
        configuration.singleRun = false;
        configuration.autoWatch = true;
    }*/

    config.set(configuration);
};
