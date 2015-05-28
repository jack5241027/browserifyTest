var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	livereload = require('gulp-livereload'),
	mainBowerFiles = require('main-bower-files'),
	gulpFilter = require('gulp-filter'),
	install = require('gulp-install'),
	rimraf = require('rimraf'),
	concat = require('gulp-concat'),
	react = require('gulp-react');

var js_dest_path = 'scripts/lib';
var css_dest_path = 'css/lib';
var fonts_dest_path = 'css/lib/fonts';
var jsFilter = gulpFilter('*.js');
var cssFilter = gulpFilter('*.{css,css.map}');
var fontsFilter = gulpFilter('*.{eot,svg,ttf,woff,woff2}');


//Script Task -Uglifies
// gulp.task('scripts',function(){
// 	gulp.src('assets/article/*.js')
// 	.pipe(plumber())
// 	.pipe(react())
// 	.pipe(uglify())
// 	.pipe(gulp.dest('assets/article/build'));
// });

//Compile sass/scss To CSS
gulp.task('styles',function(){
	gulp.src('scss/style.{sass,scss}')
	.pipe(plumber())
	.pipe(sass({
		// outputStyle: 'compressed'
	}))
	.pipe(plumber.stop())
	.pipe(gulp.dest('css/'))
	.pipe(livereload());
});

gulp.task('livereload', function(){
	gulp.src('css/style.css')
	.pipe(livereload());
	gulp.src('html/index.html')
	.pipe(livereload());
	gulp.src('scripts/main.js')
	.pipe(livereload());
});


// gulp.task('bulidAllArticle', function() {
//   return gulp.src('assets/article/build/*.js')
//     .pipe(concat('allArticle.js'))
//     .pipe(gulp.dest('assets/js'));
// });

//Watch Task
gulp.task('watch', function(){
	livereload.listen(); 
	gulp.watch('css/style.css', ['livereload']);
	// gulp.watch('assets/article/*.js',['scripts']);
	// gulp.watch('assets/article/build/*.js',['bulidAllArticle']);
	// gulp.watch('assets/js/allArticle.js', ['livereload']);
	gulp.watch('html/*.html', ['livereload']);
	gulp.watch('scripts/*.js', ['livereload']);
	// gulp.watch('assets/js/allArticle.js', ['sripts']);
	gulp.watch('scss/style.scss',['styles']);
});

gulp.task('clean', function() {	
	rimraf("scripts/lib", function(){});
	rimraf("css/lib", function(){});
    return rimraf("bower_components", function(){});

});

gulp.task('install', function() {
    return gulp.src(['./bower.json', './package.json'])
        .pipe(install());
});

gulp.task('exportBowerFiles', function() {
	var Files = ['bower_components/**/*.*'];
    return gulp.src(mainBowerFiles().concat(Files))

    .pipe(jsFilter)
        .pipe(gulp.dest(js_dest_path))
        .pipe(jsFilter.restore())

    .pipe(cssFilter)
        .pipe(gulp.dest(css_dest_path))
        .pipe(cssFilter.restore())

    .pipe(fontsFilter)
        .pipe(gulp.dest(fonts_dest_path))
        .pipe(fontsFilter.restore())
});

gulp.task('default', ['exportBowerFiles','clean']);
