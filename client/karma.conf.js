module.exports = function(config){
      config.set({

            basePath : './',

            files : [
                  'src/vendor/angular/angular.js',
                  'src/vendor/angular-route/angular-route.js',
                  'src/vendor/angular-mocks/angular-mocks.js',
                  'src/**/*.js',
            ],

            autoWatch : true,

            frameworks: ['jasmine'],

            browsers : ['PhantomJS'],
      });
};