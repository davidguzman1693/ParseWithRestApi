'use strict'

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	bourbon = require('node-bourbon'),
	browserSync = require("browser-sync").create(),
	reload = browserSync.reload;

//Task for reloading the page
gulp.task('reload', function() {
  browserSync.reload();
  
});

//Static server + watching scss/html files
gulp.task('serve', ['sass'], function() {
	browserSync.init({
		server: "dev"
	});
});

//Task for compiling scss files
gulp.task('sass', function () {
	gulp.src('dev/styles/**.scss')
	.pipe(sass({
    includePaths: bourbon.includePaths,
    outputStyle: 'compressed',
    sourcemap: true
  }).on('error', sass.logError))
	.pipe(gulp.dest('dev/styles/'))
	.pipe(reload({stream:true}))
});

//Task for watching scss/html/js files changes
gulp.task('watch', function(){
	gulp.watch('dev/**/*.scss', ['sass']);
	gulp.watch("dev/**/*.html", ['reload']);
	gulp.watch("dev/**/*.js", ['reload']);
});

//Task by default
gulp.task('default', ['sass', 'serve', 'watch']);

