module.exports = function(config){
      config.set({

            basePath : './',

            files : [
                  'src/vendor/angular/angular.js',
                  'src/vendor/angular-resource/angular-resource.js',
                  'src/vendor/angular-mocks/angular-mocks.js',
                  'src/app/**/*.js',
                  'src/common/**/*.js',
            ],

            autoWatch : true,

            frameworks: ['jasmine'],

            browsers : ['PhantomJS'],
      });
};