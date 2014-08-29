var gulp = require('gulp');
var inject = require("gulp-inject");


/*
    dir

    summary:
            configuration object that will contain all the important globs
            used throughout the different tasks.
*/
var dir = {
    src: {
        js: ['src/app/**/*.js', 'src/common/**/*','!**/*.test.js']
    }       
};

/**
    index

    summary:
            this tasks goals is to inject all javascript source files into the index.html so 
            we dont need to do it by hand
*/
gulp.task('index', function () {
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(dir.src.js, {read: false});

  return gulp.src('./index.html')
            .pipe(inject(sources))
            .pipe(gulp.dest('./'));
});




var karma = require('karma').server;

/**
    test

    summary:
            run unit test with Karma test runner
 */
gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
    }, done);
});