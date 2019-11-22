
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    rename = require('gulp-rename'),
    cleancss  = require('gulp-clean-css'),
    autoprefixer  = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    rsync         = require('gulp-rsync'),
    uglify = require('gulp-uglify');

function style() {
	return gulp.src('./app/sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename({ suffix: '.min', prefix : '' }))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
		.pipe(gulp.dest('./app/css'))
	    .pipe(browserSync.stream());
}

function js() {
	return gulp.src([
		'./app/libs/jquery/dist/jquery.min.js',
		'./app/js/common.js', // Always at the end
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.stream());
}

function rsync() {
	return gulp.src('app/**')
	.pipe(rsync({
		root: 'app/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		// include: ['*.htaccess'], // Includes files to deploy
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}));
}

function watch() {
	browserSync.init({
		server: {
			baseDir: './app'
        },
        notify: false
	});
	gulp.watch('./app/sass/**/*.sass', style);
	gulp.watch('./app/js/common.js', js);
	gulp.watch('./app/*.html').on('change', browserSync.reload);
}

exports.style = style;
exports.js = js;
exports.watch = watch;
exports.rsync = rsync;