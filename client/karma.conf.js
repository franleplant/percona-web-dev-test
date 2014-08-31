module.exports = function(config){
    config.set({

        basePath : './src/',

        files : [
            'vendor/angular/angular.js',
            'vendor/angular-resource/angular-resource.js',
            'vendor/angular-mocks/angular-mocks.js',
            'app/**/*.js',
            'common/**/*.js',
            {pattern: 'common/directives/**/*.tpl.html', watched: true, included: false, served: true}
        ],

        autoWatch : true,

        frameworks: ['jasmine'],

        /* Only PhantomJS for speed */
        browsers : ['PhantomJS'/*, 'Chrome'*/],
    });
};