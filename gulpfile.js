var gulp = require('gulp');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var dirSync = require( 'gulp-directory-sync' );
var browserSync = require('browser-sync');

gulp.task('build', ['makeCoffee', 'sync']);

gulp.task('default', ['build', 'sync', 'watch', 'browser-sync']);

// check for new coffee script files, then convert them and rebuild
gulp.task('watch', function(){
  gulp.watch('./src/**/*.coffee', ['build']);
})

gulp.task( 'sync', function() {
  gulp.src( '' )
    .pipe(dirSync( './src', 'build', { ignore: '*.coffee', printSummary: true } ))
    .on('error', gutil.log);

})

// sync changes to browser
gulp.task('browser-sync', function(){
  browserSync.init({
    server: {
      baseDir: 'build'
    },
    browser: 'google chrome',
    injectChanges: false,
    files: ['build/**/*.*'],
    notify: true
  })
})

// compile coffee script to js
gulp.task('makeCoffee', function(){
  gulp.src('src/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('build/'))
})
