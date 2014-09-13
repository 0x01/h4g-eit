var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('less', function() {
	gulp.src('public/styles/main.less')
		.pipe($.less())
		.pipe(gulp.dest('public/styles/'));
});

gulp.task('develop', function () {
	$.nodemon({
		script: 'server.js',
		ext: 'html js json less'
	})
	.on('change', ['less'])
	.on('restart', function () {
		console.log('restarted!')
	})
});
