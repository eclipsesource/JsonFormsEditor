
module.exports = function(config){

    var configuration = {
        // other things
        frameworks: ['jasmine'],
        singleRun: true,
        autoWatch: false,
        browsers: ['PhantomJS'],
        basePath: '',
        preprocessors: {
            'test/**/*.js': ['coverage']
        },
        reporters: ['dots', 'coverage'],
        coverageReporter: {
            type: 'json',
            dir: 'test/coverage/',
            file: 'coverage.json'
        }
    };

    /*if (process.env.USER === 'pancho111203' || process.env.USER === 'hector') {
        configuration.browsers = ['Chrome'];
        configuration.singleRun = false;
        configuration.autoWatch = true;
    }*/

    config.set(configuration);
};
